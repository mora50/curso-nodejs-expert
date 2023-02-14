/**
 * You can use this to shutdown your system stopping the DATABASE and the unfinished processes in memory, to not drop all the work instantly
 */

import { MongoClient } from 'mongodb'
import http from 'http'
import { promisify } from 'util'
async function dbConnect() {
  const client = new MongoClient(
    'mongodb://cesaraugusto:senha0001@localhost:27017'
  )

  await client.connect()
  console.log('mongo is connected!')

  const db = client.db('comics')

  return {
    collections: { heroes: db.collection('heroes') },
    client,
  }
}

const { collections, client } = await dbConnect()

async function insertData(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data)

      await collections.heroes.insertOne({
        ...hero,

        updatedAt: new Date().toUTCString(),
      })
      const heroes = await collections.heroes.find().toArray()

      res.writeHead(200)
      res.write(JSON.stringify(heroes))
    } catch (error) {
      console.log('a error has ocurred!', error)

      res.writeHead(500)
      res.write(JSON.stringify({ message: 'internal server error' }))
    } finally {
      res.end()
    }
  }
}

/**
 * curl -i localhost:3000 -X POST --data '{"name": "batman", "age": "80"}'
 */

const server = http
  .createServer(insertData)
  .listen(3000, () => console.log(`running at 3000, pid ${process.pid} `))

const onStop = async (signal) => {
  console.info(`\n${signal} signal received!`)
  // zero everthing is nice, 1 is error

  await promisify(server.close.bind(server))()
  console.log('the http server has closed!')

  await client.close()
  console.log('Mongo connection has closed!')
  process.exit(0)
}

//SIGINT -> CTRL C
//SIGTERM => KILL
;['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop))
