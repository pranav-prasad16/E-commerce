import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // State to hold current user information
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to login user
  const login = (uId, token) => {
    localStorage.setItem('jwtToken', token);
    setUserId(uId);
    setIsAuthenticated(true);
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
