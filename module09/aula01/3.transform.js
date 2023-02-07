import { createWriteStream } from 'fs'
import { Readable, Writable, Transform } from 'stream'

// data source
const readable = Readable({
  read() {
    for (let index = 0; index < 1e6; index++) {
      const person = { id: Date.now() + index, name: `Mae do fabricio e nossa [${index}]` }

      const data = JSON.stringify(person)

      this.push(data)
    }

    this.push(null)
  },
})

// data processing
const mapFields = Transform({
  transform(chunk, enconding, cb) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`
    cb(null, result)
  },
})

const mapHeaders = Transform({
  transform(chunk, enconding, cb) {
    this.counter = this.counter ?? 0

    if (this.counter) {
      return cb(null, chunk)
    }
    this.counter += 1

    cb(null, "id,name\n".concat(chunk))
  },
})

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream('my.csv'))

pipeline.on('end', () => console.log('acabou!'))
