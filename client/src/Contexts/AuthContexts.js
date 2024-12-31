import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(); // create place to keep states

// Provide states (data) to rest off the app
// Children - all components will gets access to provider
export const authProvidor = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // If user login or not
  const [token, setToken] = useState(localStorage.getItem("token") || null); // save token

  // Check if there is token in case refresh page.
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true); // token exisiting - user logged in
    } else {
      setIsAuthenticated(false); // else not
    }
  }, [token]);

  // Check if have a token - if user logged in
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // remove existing token
    setIsAuthenticated(false);
  };
  return (
    // Provide access to all wrap applications
    // Children can access to all states
    <AuthContext.Provider
      value={{ token, setToken, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
