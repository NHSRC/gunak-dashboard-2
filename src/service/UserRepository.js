import User from "../model/User";

export default class UserRepository {
  static getUser() {
    let item = localStorage.getItem('user');
    if (item === null || item === '') return null;
    let data = JSON.parse(item);
    return new User(data);
  }

  static setUser(userJson) {
    localStorage.setItem('user', JSON.stringify(userJson));
  }

  static removeUser() {
    localStorage.removeItem('user');
  }
}
