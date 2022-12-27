import mongoose from 'mongoose'

export default class MongoDBstrategy {
  /** @type {mongoose} */
  #instance
  constructor(connectionString) {
    this.connectionString = connectionString
    this.collection = 'warriors'
  }

  async connect() {
    try {
      this.#instance = await mongoose.connect(this.connectionString)
    } catch (error) {
      return console.log('error on connection')
    }
  }

  async read(item) {
    return await this.#instance.model(this.collection).find()
  }

  async create(item) {
    const Warrior = this.#instance.model(this.collection, { name: String })

    const warrior = new Warrior({ name: item.name })

    try {
      await warrior.save()

      console.log('sucess')
    } catch (error) {
      console.log('error')
    }
  }
}
