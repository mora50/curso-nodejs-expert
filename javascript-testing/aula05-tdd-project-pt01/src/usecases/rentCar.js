const { readFile } = require("fs/promises");
const { join } = require("path");
const CarCategory = require("../entities/carCategory");
const Customer = require("../entities/customer");

const customersRepository = async () => {
  const data = await readFile(
    join(__dirname, "../", "../", "database", "customers.json").toString("utf8")
  );

  return JSON.parse(data);
};

const carCategoriesRepository = async () => {
  const data = await readFile(
    join(__dirname, "../", "../", "database", "carCategories.json").toString(
      "utf8"
    )
  );

  return JSON.parse(data);
};

class RentCarUseCase {
  async execute(days, customerId, carCartegoryId) {
    const customers = await customersRepository();

    const customer = new Customer(
      customers.find((customer) => customer.id === customerId)
    );

    if (!customer) {
      throw Error("This customer does't exists!");
    }

    const carCategories = await carCategoriesRepository();

    const carCategory = new CarCategory(
      carCategories.find((carCategory) => carCategory.id === carCartegoryId)
    );

    carCategory.rentPrice(days);

    carCategory.additionalAgeFee(customer.age);

    return carCategory.formattedPrice;
  }
}

module.exports = RentCarUseCase;
