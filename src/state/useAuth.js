import React, {useState, useEffect, useContext, createContext} from "react";
import LoginService from "../service/LoginService";

const authContext = createContext();

export function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return LoginService.login(email, password, () => {
      setUser(LoginService.getUser());
    }, () => {
      setUser(null);
    });
  };

  const signout = cb => {
    LoginService.logout();
  };

  // Return the user object and auth methods
  return {
    user,
    signin,
    signout,
  };
}
