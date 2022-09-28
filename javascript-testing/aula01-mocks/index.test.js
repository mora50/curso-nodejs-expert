const { rejects, deepStrictEqual } = require("assert");
const { error } = require("./src/constants");
const File = require("./src/file");
(async () => {
  // const result = await File.csvToJson("../mocks/threeItems-valid.csv");

  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/four-valid-items.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        name: "Cesar Augusto",
        id: 123,
        stack: "Javascript",
        profession: "Student",
        birthDay: 1998,
      },
      {
        name: "Leandro Augusto",
        id: 321,
        stack: "Javascript",
        profession: "Student",
        birthDay: 1998,
      },
      {
        name: "Wagner Augusto",
        id: 231,
        stack: "Javascript",
        profession: "Student",
        birthDay: 1998,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
