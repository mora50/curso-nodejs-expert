const { rejects } = require("assert");
const { error } = require("./src/constants");
const File = require("./src/file");
(async () => {
  // const result = await File.csvToJson("../mocks/threeItems-valid.csv");

  const filePath = "./mocks/emptyFile-invalid.csv";
  const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
  const result = File.csvToJson(filePath);

  await rejects(result, rejection);
})();
