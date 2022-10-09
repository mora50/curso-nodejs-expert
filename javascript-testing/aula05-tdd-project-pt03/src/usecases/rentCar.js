const CarCategory = require("../entities/carCategory");
const Customer = require("../entities/customer");
const Tax = require("../entities/tax");
const BaseRepository = require("../repository/base/baseRepository");

class RentCar {
  constructor(carCategories, customers) {
    this.carCategoriesRepository = new BaseRepository({ file: carCategories });
    this.customersRepository = new BaseRepository({ file: customers });
  }

  async execute(days, customerId, carCartegoryId) {
    const hasCustomer = await this.customersRepository.find(customerId);

    const customer = new Customer(hasCustomer);

    const carCategory = new CarCategory(
      await this.carCategoriesRepository.find(carCartegoryId)
    );

    const tax = new Tax();

    const value = tax.calculateTheFee(customer.age, carCategory.price, days);

    return value;
  }
}

module.exports = RentCar;
