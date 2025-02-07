import React, { useState } from "react";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

const AuthContextProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  const context = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthContextProvider;
