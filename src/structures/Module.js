/**
 * Base module structure
 */
module.exports = class Module {
  constructor (client) {
    this.client = client

    this.name = ''
    this.envVars = []
    this.requiresDatabase = false
  }

  /**
   * Check if the API can load
   * @returns {boolean} - Whether the API can load
   */
  canLoad () {
    let value = true
    console.log(this)
    if (this.requiresDatabase && !this.database) return false
    if (this.envVars && !this.envVars.every(v => process.env[v])) return false
    return value
  }

  /**
   * Loads the module
   * @returns {Object} - The loaded module
   */
  load () {
    return this
  }
}