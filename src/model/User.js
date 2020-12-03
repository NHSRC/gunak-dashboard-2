export default class User {
  constructor(data) {
    this.data = data;
  }

  getFullName() {
    return `${this.data["firstName"]} ${this.data["lastName"]}`;
  }
}
