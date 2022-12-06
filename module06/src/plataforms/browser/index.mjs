import ViewFactory from '../../protocols/viewFactory.mjs'
import TableBrowserComponent from './table.mjs'

export default class BrowserViewFactory extends ViewFactory {
  createTable(data) {
    return new TableBrowserComponent()
  }
}
