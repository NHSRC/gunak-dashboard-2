import _ from 'lodash';

export default class User {
  constructor(data) {
    this.data = data;
  }

  getFullName() {
    return `${this.data["firstName"]} ${this.data["lastName"]}`;
  }

  getStateId() {
    let statePrivilege = _.filter(this.data["privileges"], (privilege) => {
      return !_.isNil(privilege["stateId"]);
    });
    if (statePrivilege.length === 0) return null;
    return statePrivilege[0]["stateId"];
  }
}
