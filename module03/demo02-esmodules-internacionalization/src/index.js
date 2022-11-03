import database from "./../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANGUAGE = "pt-BR";

const terminalController = new TerminalController();
const STOP_TERM = ":q";
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
  try {
    const answer = await terminalController.question();
    if (STOP_TERM === answer) {
      terminalController.closeTerminal();
      return console.log("Process finished");
    }

    const person = Person.generateInstanceFromString(answer);

    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));

    await mainLoop();
  } catch (error) {
    console.log({ error });
    console.error("Some error ocurred");

    await mainLoop();
  }
}

await mainLoop();
