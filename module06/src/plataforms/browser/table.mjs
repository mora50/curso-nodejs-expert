import TableComponent from '../../protocols/tableComponent.mjs'

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    this.generateTableHtml(data)
  }

  generateTableHtml(data) {
    const [firstItem] = data

    const tHeadNames = Object.keys(firstItem)

    const tHead = tHeadNames.map((name) => `<th>${name}</th>`)

    const tr = data.map(
      (value) =>
        `<tr>${Object.values(value)
          .map((tdValue) => `<td>${tdValue}</td>`)
          .join('')}</tr>`
    )

    const table = `<table class="table">
    <thead> <tr> 
    ${tHead.join('')}
    </tr> </thead>
     <tbody>
   ${tr.join('')}
  </tbody></table>`
    document.body.insertAdjacentHTML('afterbegin', table)
  }
}
