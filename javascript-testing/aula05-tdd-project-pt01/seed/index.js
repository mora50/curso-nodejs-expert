const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");
const { join } = require("path");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");

const databaseFolder = join(__dirname, "../", "database");

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),

  carIds: [],
  price: faker.datatype.float({ min: 50, max: 200 }),
});

const costumers = [];

const cars = [];

const ITEMS_COUNT = 3;

for (let index = 0; index <= ITEMS_COUNT; index++) {
  const customer = new Customer({
    id: faker.datatype.uuid(),
    age: faker.datatype.number({ max: 50, min: 18 }),
    name: faker.name.fullName(),
  });

  const car = new Car({
    id: faker.datatype.uuid(),
    gasAvailable: faker.datatype.boolean(),
    available: faker.datatype.boolean(),
    name: faker.vehicle.vehicle(),
    releaseYear: faker.date.past().getFullYear(),
  });

  cars.push(car);

  carCategory.carIds.push(car.id);

  costumers.push(customer);
}

const write = (fileName, data) =>
  writeFile(join(databaseFolder, fileName), JSON.stringify(data), () =>
    console.log(`${fileName} was generated`)
  );
(async () => {
  await write("cars.json", cars);

  await write("carCategories.json", [carCategory]);

  await write("customers.json", costumers);
})();
