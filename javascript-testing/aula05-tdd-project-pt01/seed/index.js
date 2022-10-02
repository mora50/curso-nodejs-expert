const { faker } = require("@faker-js/faker");

console.log({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
});
