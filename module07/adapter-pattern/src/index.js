import RickAndMortyBRLAdapter from './business/adapters/rickAndMortyBRLAdapter.js'
import RickAndMortyUSAAdapter from './business/adapters/rickAndMortyUSAAdapter.js'

const data = [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map((adapter) =>
  adapter.getCharacters()
)

const allAdapters = await Promise.allSettled(data)

const success = allAdapters
  .filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), [])

const errors = allAdapters.filter(({ status }) => status === 'rejected')

console.table(success)
console.table(errors)
