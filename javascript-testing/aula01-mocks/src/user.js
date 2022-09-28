class User {
  constructor({ name, id, stack, profession, age }) {
    this.name = name;
    this.id = parseInt(id);
    this.stack = stack;
    this.profession = profession;
    this.birthDay = new Date().getFullYear() - age;
  }
}

module.exports = User;
