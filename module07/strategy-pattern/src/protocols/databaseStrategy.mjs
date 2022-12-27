export default class ContextStrategy {
  constructor(dbStrategy) {
    this.dbStrategy = dbStrategy
  }

  connect() {
    return this.dbStrategy.connect()
  }

  read(item) {
    return this.dbStrategy.read(item)
  }

  create(item) {
    return this.dbStrategy.create(item)
  }
}
