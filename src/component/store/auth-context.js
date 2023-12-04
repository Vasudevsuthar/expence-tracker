import React, { useState, useEffect } from "react";


const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  isProfileComplete: false,
  login: (token, email) => {},
  logout: () => {},
  completeProfile: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem("token");
  let initialEmail = localStorage.getItem("email");
  let initialProfileComplete = localStorage.getItem("isProfileComplete") === "true";


  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [isProfileComplete, setIsProfileComplete] = useState(initialProfileComplete);


  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("isProfileComplete", isProfileComplete);
  }, [token, email, isProfileComplete]);

  function loginHandler(token, email) {
    setToken(token);
    setEmail(email);
  }

  function completeProfileHandler() {
    setIsProfileComplete(true);
  }

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    setIsProfileComplete(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("isProfileComplete");
    setToken("");
    setEmail("");
  };




  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    isProfileComplete: isProfileComplete,
    login: loginHandler,
    logout: logoutHandler,
    completeProfile: completeProfileHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
