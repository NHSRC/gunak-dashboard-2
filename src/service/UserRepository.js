import User from "../model/User";

export default class UserRepository {
  static getUser() {
    return new User(JSON.parse(localStorage.getItem('user')));
  }

  static setUser(userJson) {
    localStorage.setItem('user', JSON.stringify(userJson));
  }

  static removeUser() {
    localStorage.removeItem('user');
  }
}
