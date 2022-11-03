const { expect } = require("chai");
const { describe } = require("mocha");
const TextProcessorFluentAPI = require("../textProcessorFluentAPI");

const mock = require("./valid/valid");

describe("TextProcessorFluentAPI", () => {
  it("#build", () => {
    const sut = new TextProcessorFluentAPI(mock).build();

    expect(sut).to.be.deep.equal(mock);
  });

  it("#extractPeopleData", () => {
    const sut = new TextProcessorFluentAPI(mock).extractPeopleData().build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(sut).to.be.deep.equal(expected);
  });
});
