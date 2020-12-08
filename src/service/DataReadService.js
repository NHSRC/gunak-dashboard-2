import LoginService from "./LoginService";

export default class DataReadService {
  static getState() {
    let user = LoginService.getUser();
    const getStateRequest = new Request(`/api/state/${user.getStateId()}`, {
      method: 'GET'
    });
    return fetch(getStateRequest).then((response) => response.json());
  }
}
