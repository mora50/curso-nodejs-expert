InjectHttpInterceptor()

import http from 'http'
import { InjectHttpInterceptor } from './agent.js'

const handleRequest = (req, res) => {
  res.end('hello world')
}

const server = http.createServer(handleRequest)

const port = 3000

server.listen(port, () => console.log('serve running', server.address().port))
