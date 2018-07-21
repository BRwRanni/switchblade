const { CanvasTemplates, CommandStructures } = require('../../')
const { Command, CommandParameters, UserParameter } = CommandStructures
const { Attachment } = require('discord.js')

module.exports = class Profile extends Command {
  constructor (client) {
    super(client)
    this.name = 'profile'
    this.aliases = []

    this.parameters = new CommandParameters(this,
      new UserParameter({full: true, required: false})
    )
  }

  async run ({ t, author, channel, userDocument }, user) {
    channel.startTyping()

    user = user || author
    if (user !== author) userDocument = await this.client.database.users.get(user.id)    
    const profile = await CanvasTemplates.profile({ t }, user, userDocument)
    channel.send(new Attachment(profile, 'profile.jpg')).then(() => channel.stopTyping())
  }
}
