import { Readable, Writable } from 'stream'

// data source
const readable = Readable({
  read() {
    this.push('Hello world 1')
    this.push('Hello world 2')
    this.push('Hello world 3')

    //notifies that the data ended
    this.push(null)
  },
})

// data output

const writable = Writable({
  write(chunk, enconding, callBack) {
    console.log('msg', chunk.toString())

    callBack()
  },
})

readable
  //writable is always the output -> print, save, ignore
  .pipe(writable)
