class Tax {
  get taxesBasedOnAge() {
    return [
      { from: 18, to: 25, then: 1.1 },
      { from: 26, to: 30, then: 1.5 },
      { from: 31, to: 100, then: 1.3 },
    ];
  }

  calculateTheFee(age, price, days) {
    const { then: tax } = this.taxesBasedOnAge.find(
      ({ from, to }) => age >= from && age <= to
    );

    price = price * tax * days;

    return this.formatTheTax(price);
  }

  formatTheTax(price) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  }
}

module.exports = Tax;
