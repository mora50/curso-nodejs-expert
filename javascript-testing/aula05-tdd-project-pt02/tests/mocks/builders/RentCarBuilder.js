const RentCar = require('../../../src/usecases/rentCar')
const { join } = require('path')
const carCategoriesDatabase = join(
  __dirname,
  '../',
  '../',
  '../',
  'database',
  'carCategories.json'
)

const customersDatabase = join(
  __dirname,
  '../',
  '../',
  '../',
  'database',
  'customers.json'
)

const mocks = {
  validCarCategory: require('../valid-carCategory.json'),

  validCar: require('../valid-car.json'),

  validCustomer: require('../valid-customers.json'),
}

class RentCarBuilder {
  constructor() {
    this.validCustomer = mocks.validCustomer
    this.validCarCategory = mocks.validCarCategory
    this.validCar = mocks.validCar
  }

  static aRentCar() {
    return new RentCarBuilder()
  }

  customerWithAgeBetween18and25() {
    this.validCustomer.age = 24

    return this
  }

  customerWithAgeBetween26and30() {
    this.validCustomer.age = 28

    return this
  }

  build() {
    const rentCar = new RentCar(carCategoriesDatabase, customersDatabase)

    return rentCar
  }
}

module.exports = RentCarBuilder
