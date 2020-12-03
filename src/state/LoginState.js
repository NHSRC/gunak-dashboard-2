export default class LoginState {
    static newInstance() {
        let loginState = new LoginState();
        loginState.loginFailed = false;
        return loginState;
    }

    static clone(other) {
        let loginState = new LoginState();
        loginState.loginFailed = other.loginFailed;
        loginState.errorMessage = other.errorMessage;
        return loginState;
    }

    static loginFailed(loginState, httpError) {
        loginState.loginFailed = true;
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
}
