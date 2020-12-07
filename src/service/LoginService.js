import _ from 'lodash';
import HTTPError from "./HTTPError";
import User from "../model/User";

const sessionDurationSeconds = 1000 * 60 * 60 * 24 * 5;
const lastActionTimeStorageKey = "LAST_ACTION_TIME";

export default class LoginService {
  static updateLocalStoredTime() {
    let lastActionTime = new Date().getTime();
    localStorage.setItem(lastActionTimeStorageKey, lastActionTime);
  }

  static sessionExpired() {
    let nowTimeStamp = new Date().getTime();
    let lastActionTime = localStorage.getItem(lastActionTimeStorageKey);
    let difference = Math.abs((lastActionTime ? lastActionTime : nowTimeStamp) - nowTimeStamp);
    console.log('[AUTH PROVIDER][AUTH_LOGIN]', 'Inactivity period duration in seconds: ', difference / 1000);
    return difference > sessionDurationSeconds;
  }

  static clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem(lastActionTimeStorageKey);
  }

  static logout() {
    this.clearLocalStorage();
  }

  static authCheck() {
    this.updateLocalStoredTime();
    return localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
  }

  static isLoggedIn() {
    return !_.isNil(localStorage.getItem('user'));
  }

  static authFailed() {
    this.clearLocalStorage();
  }

  static login(username, password, onSuccess, onFailure) {
    let postObject = {email: username, password: password};

    let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
    let formBody = encodedObj.join("&");

    const request = new Request('/api/login', {
      method: 'POST',
      body: formBody,
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    });

    const verifyLoginRequest = new Request('/api/currentUser', {
      method: 'GET'
    });

    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new HTTPError(response.status, response.statusText);
        }
      })
      .then(() => {
        console.log(`Request: ${JSON.stringify(verifyLoginRequest)}`);
        return fetch(verifyLoginRequest);
      })
      .then((verifyLoginResponse) => {
        if (verifyLoginResponse.status < 200 || verifyLoginResponse.status >= 300) {
          onFailure(verifyLoginResponse.statusText);
        } else {
          return verifyLoginResponse.json();
        }
      }).then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.updateLocalStoredTime();
        onSuccess(this.getUser());
      }).catch((error) => {
        console.log(error);
        onFailure(error);
      });
  }

  static getUser() {
    return new User(JSON.parse(localStorage.getItem('user')));
  }
}
