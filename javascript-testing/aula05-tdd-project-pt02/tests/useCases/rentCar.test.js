const { join } = require("path");
const RentCar = require("../../src/usecases/rentCar");
const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const carCategoriesDatabase = join(
  __dirname,
  "../",
  "../",
  "database",
  "carCategories.json"
);

const customersDatabase = join(
  __dirname,
  "../",
  "../",
  "database",
  "customers.json"
);

describe("Use case - Rent a car", () => {
  let sut = {};

  before(() => {
    sut = new RentCar(carCategoriesDatabase, customersDatabase);
  });

  it("Should calculate the fee based on age major than 50", async () => {
    const customerId = "3521d705-1cf2-4658-b1a8-d7cf41ea249f";

    const categoryId = "407c02c9-750f-42ac-8618-61b087790cc8";

    const result = await sut.execute(5, customerId, categoryId);

    const expected = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(244.4);

    expect(result).to.be.deep.equal(expected);

    //assert.equal(result.toString(), expected);
  });

  // it("Should calculate the fee based on age minor than 50", async () => {
  //   const customerId = "ea87a39a-234d-458e-981a-a65429e1ab28";

  //   const categoryId = "407c02c9-750f-42ac-8618-61b087790cc8";

  //   const result = await sut.execute(5, customerId, categoryId);

  //   const expected = "R$ 188,00".replace(/\s/, String.fromCharCode(160));

  //   assert.equal(result.toString(), expected);
  // });

  // it("Should throw error if customer not exists", async () => {
  //   const customerId = "ea87a39a-234d-458e-981a";

  //   const categoryId = "407c02c9-750f-42ac-8618-61b087790cc8";

  //   const result = async () => sut.execute(5, customerId, categoryId);

  //   await assert.rejects(result, {
  //     message: "This customer does't exists!",
  //   });
  // });
});
