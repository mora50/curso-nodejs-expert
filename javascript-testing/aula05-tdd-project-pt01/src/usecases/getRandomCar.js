const BaseRepository = require("../repository/base/baseRepository");

class GetRandomCarFromCategory {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
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
}

module.exports = GetRandomCarFromCategory;
