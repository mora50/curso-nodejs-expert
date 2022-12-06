import TableComponent from '../../protocols/tableComponent.mjs'
import chalkTable from 'chalk-table'

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const table = chalkTable({}, data)
    console.log(table)
  }
}
