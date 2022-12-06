import database from './database/data.mjs'

class App {
  constructor(factory) {
    this.table = factory.createTable()
  }

  initialize(data) {
    this.table.render(data)
  }
}

;(async () => {
  const path = globalThis.window ? 'browser' : 'console'

  const { default: ViewFactory } = await import(
    `./plataforms/${path}/index.mjs`
  )

  const viewFactory = new ViewFactory()

  const app = new App(viewFactory)

  app.initialize(database)
})()
