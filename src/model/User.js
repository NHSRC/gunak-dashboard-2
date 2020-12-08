import _ from 'lodash';

export default class User {
  constructor(data) {
    this.data = data;
  }

  getFullName() {
    return `${User.getFirstName(this)} ${User.getLastName(this)}`;
  }

  getStateId() {
    let statePrivilege = _.filter(this.data["privileges"], (privilege) => {
      return !_.isNil(privilege["stateId"]);
    });
    if (statePrivilege.length === 0) return null;
    return statePrivilege[0]["stateId"];
  }

  static getFirstName(user) {
    return user.data["firstName"];
  }

  static getLastName(user) {
    return user.data["lastName"];
  }

  static getEmail(user) {
    return user.data["email"];
  }

  static updateField(user, name, value) {
    user.data[name] = value;
  }
}
