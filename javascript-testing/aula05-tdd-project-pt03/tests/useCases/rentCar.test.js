const { join } = require("path");
const RentCar = require("../../src/usecases/rentCar");
const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const Tax = require("../../src/entities/tax");
const sinon = require("sinon");
const carCategoriesDatabase = join(
  __dirname,
  "../",
  "../",
  "database",
  "carCategories.json"
);

const customersDatabase = join(
  __dirname,
  "../",
  "../",
  "database",
  "customers.json"
);

const mocks = {
  validCarCategory: require("./../mocks/valid-carCategory.json"),

  validCar: require("./../mocks/valid-car.json"),

  validCustomer: require("./../mocks/valid-customers.json"),
};

describe("Use case - Rent a car", () => {
  let sut = {};
  let sandbox = {};

  before(() => {
    sut = new RentCar(carCategoriesDatabase, customersDatabase);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should calculate the fee based on age major than 30", async () => {
    const customer = mocks.validCustomer[0];

    const carCategory = mocks.validCarCategory;
    sandbox
      .stub(sut.carCategoriesRepository, sut.carCategoriesRepository.find.name)
      .resolves(carCategory);

    sandbox
      .stub(sut.customersRepository, sut.customersRepository.find.name)
      .resolves(customer);

    const result = await sut.execute(5, customer.id, carCategory.id);

    const tax = new Tax();

    const expected = tax.formatTheTax(244.4);

    expect(result).to.be.deep.equal(expected);
  });

  it("Should calculate the fee based on age between 18 and 25 ", async () => {
    const customer = mocks.validCustomer[1];

    const carCategory = mocks.validCarCategory;
    sandbox
      .stub(sut.carCategoriesRepository, sut.carCategoriesRepository.find.name)
      .resolves(carCategory);

    sandbox
      .stub(sut.customersRepository, sut.customersRepository.find.name)
      .resolves(customer);

    const result = await sut.execute(5, customer.id, carCategory.id);

    const tax = new Tax();

    const expected = tax.formatTheTax(206.8);

    expect(result).to.be.deep.equal(expected);
  });

  it("Should calculate the fee based on age between 26 and 30 ", async () => {
    const customer = mocks.validCustomer[2];

    const carCategory = mocks.validCarCategory;
    sandbox
      .stub(sut.carCategoriesRepository, sut.carCategoriesRepository.find.name)
      .resolves(carCategory);

    sandbox
      .stub(sut.customersRepository, sut.customersRepository.find.name)
      .resolves(customer);

    const result = await sut.execute(5, customer.id, carCategory.id);

    const tax = new Tax();

    const expected = tax.formatTheTax(282);

    expect(result).to.be.deep.equal(expected);
  });
});
