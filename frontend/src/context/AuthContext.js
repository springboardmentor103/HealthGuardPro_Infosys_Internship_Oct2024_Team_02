import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // To prevent premature redirection

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserId(storedUserId);
    }
    setIsLoading(false); // Indicate that authentication check is complete
  }, []);

  const login = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        userId,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
