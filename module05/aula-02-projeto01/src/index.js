"use strict";
const { readFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

(async () => {
  const bufferData = await readFile(
    join(__dirname, "./../../docs/contrato.pdf")
  );

  const data = await pdf(bufferData);

  console.log(data.text);
})();
