export default class NotImplementedException extends Error {
  constructor(message) {
    super(`This method was not implemented ${message}`)
    this.name = 'NotImplementedException'
  }
}
