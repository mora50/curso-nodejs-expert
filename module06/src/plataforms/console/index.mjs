import ViewFactory from '../../protocols/viewFactory.mjs'
import TableConsoleComponent from './table.mjs'

export default class ConsoleViewFactory extends ViewFactory {
  createTable() {
    return new TableConsoleComponent()
  }
}
