import ContextStrategy from './src/protocols/databaseStrategy.mjs'
import MongoDBstrategy from './src/strategies/mongoDbStrategy.mjs'
import PostgresStrategy from './src/strategies/postgresStrategy.mjs'

const postGresConnectionString =
  'postgres://cesaraugusto:senha0001@localhost:5432/heroes'

const postGresStrategy = new ContextStrategy(
  new PostgresStrategy(postGresConnectionString)
)

await postGresStrategy.connect()

const mongoDBConnectionString =
  'mongodb://cesaraugusto:senha0001@localhost:27017'

const mongoDBStrategy = new ContextStrategy(
  new MongoDBstrategy(mongoDBConnectionString)
)

await mongoDBStrategy.connect()

const data = [
  {
    name: 'César',
    type: 'transaction',
  },
  {
    name: 'Gabrielle',
    type: 'activitylog',
  },
]

const contextTypes = {
  transaction: postGresStrategy,
  activitylog: mongoDBStrategy,
}

for await (const { type, name } of data) {
  const strategy = contextTypes[type]

  await strategy.create({ name: name + Date.now() })
}
