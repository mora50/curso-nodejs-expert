const CarCategory = require("../entities/carCategory");
const Customer = require("../entities/customer");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");
const BaseRepository = require("../repository/base/baseRepository");

class RentCar {
  constructor(carCategories, customers, cars) {
    this.carCategoriesRepository = new BaseRepository({ file: carCategories });
    this.customersRepository = new BaseRepository({ file: customers });
    this.carRepository = new BaseRepository({ file: cars });
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

  getRandomCarFromCategory(data) {
    const listLength = data.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomCarFromCategory(carCategory.carIds);

    const carId = carCategory.carIds[randomCarIndex];

    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);

    const tax = new Tax();

    const amount = tax.calculateTheFee(
      customer.age,
      carCategory.price,
      numberOfDays
    );

    const today = new Date();

    today.setDate(today.getDate() + numberOfDays);

    const options = { year: "numeric", month: "long", day: "numeric" };

    const dueDate = today.toLocaleDateString("pt-br", options);

    const transaction = new Transaction({ customer, car, amount, dueDate });

    return transaction;
  }
}

module.exports = RentCar;
