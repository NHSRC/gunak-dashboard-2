import _ from 'lodash';

export default class LoginState {
  static LOGIN_STATUS_UNKNOWN = "unknown";
  static LOGIN_STATUS_SUCCESS = "success";
  static LOGIN_STATUS_FAILED = "failed";
  static LOGIN_STATUS_NO_STATE_ACCESS = "no state access";

  static newInstance() {
    let loginState = new LoginState();
    loginState.loginStatus = this.LOGIN_STATUS_UNKNOWN;
    return loginState;
  }

  static clone(other) {
    let loginState = new LoginState();
    loginState.loginStatus = other.loginStatus;
    loginState.errorMessage = other.errorMessage;
    return loginState;
  }

  static loginFailed(loginState, httpError) {
    loginState.loginStatus = this.LOGIN_STATUS_FAILED;
    if (httpError.status === 401) {
      loginState.errorMessage = "Invalid login credentials";
    }
    else if (httpError.status === 404) {
      loginState.errorMessage = "Server not available";
    }
    else {
      loginState.errorMessage = httpError.message;
    }
  }

  static loginSucceeded(loginState, user) {
    loginState.loginStatus = _.isNil(user) ? LoginState.LOGIN_STATUS_NO_STATE_ACCESS : LoginState.LOGIN_STATUS_SUCCESS;
    loginState.errorMessage = undefined;
  }
}
