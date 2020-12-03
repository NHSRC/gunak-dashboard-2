export default class LoginState {
  static LOGIN_STATUS_UNKNOWN = "UNKNOWN";
  static LOGIN_STATUS_SUCCESS = "SUCCESS";
  static LOGIN_STATUS_FAILED = "FAILED";

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

  static loginSucceeded(loginState) {
    loginState.loginStatus = this.LOGIN_STATUS_SUCCESS;
    loginState.errorMessage = undefined;
  }
}
