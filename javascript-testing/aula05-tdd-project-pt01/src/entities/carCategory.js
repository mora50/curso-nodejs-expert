const Base = require("./base/base");

class CarCategory extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name });
    this.carIds = carIds;
    this.price = price;
  }

  rentPrice(days) {
    this.price = this.price * days;
  }

  additionalAgeFee(age) {
    if (age >= 50) {
      this.price += this.price * 0.3;
    }
  }

  get formattedPrice() {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.price);
  }
}
module.exports = CarCategory;
