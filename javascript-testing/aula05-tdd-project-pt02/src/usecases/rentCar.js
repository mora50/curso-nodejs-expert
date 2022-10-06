const CarCategory = require("../entities/carCategory");
const Customer = require("../entities/customer");
const BaseRepository = require("../repository/base/baseRepository");

class RentCar {
  constructor(carCategories, customers) {
    this.carCategoriesRepository = new BaseRepository({ file: carCategories });
    this.customersRepository = new BaseRepository({ file: customers });
  }

  async execute(days, customerId, carCartegoryId) {
    const hasCustomer = await this.customersRepository.find(customerId);

    if (!hasCustomer) {
      throw Error("This customer does't exists!");
    }

    const customer = new Customer(hasCustomer);

    const carCategory = new CarCategory(
      await this.carCategoriesRepository.find(carCartegoryId)
    );

    carCategory.rentPrice(days);

    carCategory.additionalAgeFee(customer.age);

    return carCategory.formattedPrice;
  }
}

module.exports = RentCar;
