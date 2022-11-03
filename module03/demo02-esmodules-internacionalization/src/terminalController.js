import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DraftLog from 'draftlog';
import readLine from 'readline';
import Person from './person.js';

class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));

    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table);

    this.data = data;
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);

    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable(database, language);
  }

  question(msg = '') {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  updateTable(item) {
    this.data.push(item);

    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.bgBlue('Km traveled') },
        { field: 'from', name: chalk.red('From') },
        { field: 'to', name: chalk.green('To') },
      ],
    };
  }
}

export default TerminalController;
