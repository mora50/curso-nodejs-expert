import knex from 'knex'

export default class PostgresStrategy {
  #instance
  constructor(connectionString) {
    this.connectionString = connectionString
    this.table = 'warriors'
  }

  async connect() {
    this.#instance = await knex({
      client: 'pg',
      connection: this.connectionString,
    })

    return this.#instance.raw('select 1+1 as result')
  }

  async read(item) {
    return this.#instance.select().from(this.table)
  }

  async create(item) {
    return this.#instance.insert(item).into(this.table)
  }
}
