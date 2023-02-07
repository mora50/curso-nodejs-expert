import axios from 'axios'
import { PassThrough, Writable } from 'stream'
const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'get',
    url: API_01,
    responseType: 'stream',
  }),
  axios({
    method: 'get',
    url: API_02,
    responseType: 'stream',
  }),
])

const results = requests.map(({ data }) => data)

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, '')
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name

    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  },
})

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    current.pipe(prev, { end: false })

    current.on('end', () => items.every((s) => s.ended) && prev.end())

    return prev
  }, new PassThrough())
}

// results[0].pipe(output)
// results[1].pipe(output)

merge(results).pipe(output)
