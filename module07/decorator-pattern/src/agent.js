import Http from 'http'

const InjectHttpInterceptor = async () => {
  const oldEmit = Http.Server.prototype.emit

  Http.Server.prototype.emit = function (...args) {
    const [type, req, res] = args

    if (type === 'request') {
      res.setHeader('X-Instrumented-By', 'CesarAugusto')
    }

    return oldEmit.apply(this, args)
  }
}

export { InjectHttpInterceptor }
