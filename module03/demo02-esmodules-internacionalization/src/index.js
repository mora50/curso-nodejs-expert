import database from './../database.json' assert { type: 'json' };

import Person from './person.js';
import Repository from './repository.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANGUAGE = 'pt-BR';

const terminalController = new TerminalController();
const STOP_TERM = ':q';
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (STOP_TERM === answer) {
      terminalController.closeTerminal();
      return console.log('Process finished');
    }

    const person = Person.generateInstanceFromString(answer);

    const repository = new Repository();

    await repository.save(person);

    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));

    // 1 Moto,cringe,carro 1000 2020-10-11 2021-10-11

    await mainLoop();
  } catch (error) {
    console.log({ error });
    console.error('Some error ocurred');

    await mainLoop();
  }
}

await mainLoop();
