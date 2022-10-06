const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const GetRandomCarFromCategory = require("../../src/usecases/getRandomCar");
const { join } = require("path");
const sinon = require("sinon");
const carsDatabase = join(__dirname, "./../../database", "cars.json");
const mocks = {
  validCarCategory: require("./../mocks/valid-carCategory.json"),

  validCar: require("./../mocks/valid-car.json"),

  validCustomer: require("./../mocks/valid-customers.json"),
};

describe("Suit test - Get random car from category", () => {
  let sut = {};
  let sandbox = {};
  before(() => {
    sut = new GetRandomCarFromCategory({ cars: carsDatabase });
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
});
