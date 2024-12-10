import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null); // Added userName state
  const [isLoading, setIsLoading] = useState(true); // To prevent premature redirection

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName"); // Retrieve userName from localStorage
    if (storedToken && storedUserId && storedUserName) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserId(storedUserId);
      setUserName(storedUserName); // Set userName state
    }
    setIsLoading(false); // Indicate that authentication check is complete
  }, []);

  const login = (token, userId, userName) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName); // Store userName in localStorage
    setIsAuthenticated(true);
    setToken(token);
    setUserId(userId);
    setUserName(userName); // Set userName state
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName"); // Remove userName from localStorage
    setIsAuthenticated(false);
    setToken(null);
    setUserId(null);
    setUserName(null); // Clear userName state
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        userId,
        userName, // Provide userName in the context
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
