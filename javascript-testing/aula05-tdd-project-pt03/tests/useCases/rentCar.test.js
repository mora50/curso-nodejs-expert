const { join } = require("path");
const RentCar = require("../../src/usecases/rentCar");
const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const Tax = require("../../src/entities/tax");
const sinon = require("sinon");
const Transaction = require("../../src/entities/transaction");
const carCategoriesDatabase = join(
  __dirname,
  "./../../database",
  "carCategories.json"
);

const customersDatabase = join(__dirname, "./../../database", "customers.json");
const carsDatabase = join(__dirname, "./../../database", "cars.json");
const mocks = {
  validCarCategory: require("./../mocks/valid-carCategory.json"),

  validCar: require("./../mocks/valid-car.json"),

  validCustomer: require("./../mocks/valid-customers.json"),
};

describe("Use case - Rent a car", () => {
  /**@type {RentCar} */
  let sut = {};
  let sandbox = {};

  before(() => {
    sut = new RentCar(carCategoriesDatabase, customersDatabase, carsDatabase);
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should return a random index from an array", () => {
    const data = [0, 1, 2, 3, 4];

    const result = sut.getRandomCarFromCategory(data);

    expect(result).to.be.lte(result).and.be.gte(0);
  });

  it("Should choose the first id from carIds in carCategory", () => {
    const carCategory = mocks.validCarCategory;

    const carIdIndex = 0;

    sandbox.stub(sut, sut.getRandomCarFromCategory.name).returns(carIdIndex);

    const result = sut.chooseRandomCar(carCategory);

    const expected = carCategory.carIds[carIdIndex];

    expect(sut.getRandomCarFromCategory.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  it("Given a carCategory it should return an avaiable car", async () => {
    const car = mocks.validCar;

    const carCategory = Object.create(mocks.validCarCategory);

    carCategory.carIds = [car.id];

    sandbox.stub(sut.carRepository, sut.carRepository.find.name).resolves(car);

    sandbox.spy(sut, sut.chooseRandomCar.name);

    const result = await sut.getAvailableCar(carCategory);
    const expected = car;

    expect(sut.chooseRandomCar.calledOnce).to.be.ok;

    expect(sut.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("Should calculate the fee based on age major than 30", async () => {
    const customer = mocks.validCustomer;

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
    const customer = Object.create(mocks.validCustomer);

    customer.age = 24;

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
    const customer = Object.create(mocks.validCustomer);

    customer.age = 28;

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

  it("given a customer and a car category it should return a transaction data", async () => {
    const customer = Object.create(mocks.validCustomer);

    const car = mocks.validCar;

    customer.age = 20;

    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const numberOfDays = 5;

    const dueDate = "10 de novembro de 2020";

    const now = new Date(2020, 10, 5);

    sandbox.useFakeTimers(now.getTime());

    sandbox.stub(sut.carRepository, sut.carRepository.find.name).resolves(car);

    const tax = new Tax();

    const amount = tax.formatTheTax(206.8);

    const expected = new Transaction({
      customer,
      car,
      amount,
      dueDate,
    });

    const result = await sut.rent(customer, carCategory, numberOfDays);
    expect(result).to.be.deep.equal(expected);
  });
});
