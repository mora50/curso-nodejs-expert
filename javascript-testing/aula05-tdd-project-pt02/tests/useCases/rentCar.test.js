const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const Tax = require('../../src/entities/tax')
const sinon = require('sinon')

const RentCarBuilder = require('../mocks/builders/RentCarBuilder')

describe('Use case - Rent a car', () => {
  let sut = {}
  let sandbox = {}
  let rentCarBuilder = RentCarBuilder.aRentCar()

  before(() => {
    sut = RentCarBuilder.aRentCar().build()
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should calculate the fee based on age major than 30', async () => {
    const customer = rentCarBuilder.validCustomer

    const carCategory = rentCarBuilder.validCarCategory

    sandbox
      .stub(sut.carCategoriesRepository, sut.carCategoriesRepository.find.name)
      .resolves(carCategory)

    sandbox
      .stub(sut.customersRepository, sut.customersRepository.find.name)
      .resolves(customer)

    const result = await sut.execute(5, customer.id, carCategory.id)

    const tax = new Tax()

    const expected = tax.formatTheTax(244.4)

    expect(result).to.be.deep.equal(expected)
  })

  it('Should calculate the fee based on age between 18 and 25 ', async () => {
    const customer =
      rentCarBuilder.customerWithAgeBetween18and25().validCustomer

    const carCategory = rentCarBuilder.validCarCategory

    sandbox
      .stub(sut.carCategoriesRepository, sut.carCategoriesRepository.find.name)
      .resolves(carCategory)

    sandbox
      .stub(sut.customersRepository, sut.customersRepository.find.name)
      .resolves(customer)

    const result = await sut.execute(5, customer.id, carCategory.id)

    const tax = new Tax()

    const expected = tax.formatTheTax(206.8)

    expect(result).to.be.deep.equal(expected)
  })

  it('Should calculate the fee based on age between 26 and 30 ', async () => {
    const customer =
      rentCarBuilder.customerWithAgeBetween26and30().validCustomer

    const carCategory = rentCarBuilder.validCarCategory

    sandbox
      .stub(sut.carCategoriesRepository, sut.carCategoriesRepository.find.name)
      .resolves(carCategory)

    sandbox
      .stub(sut.customersRepository, sut.customersRepository.find.name)
      .resolves(customer)

    const result = await sut.execute(5, customer.id, carCategory.id)

    const tax = new Tax()

    const expected = tax.formatTheTax(282)

    expect(result).to.be.deep.equal(expected)
  })
})
