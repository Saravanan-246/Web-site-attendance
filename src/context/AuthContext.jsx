import React, { createContext, useState, useContext } from 'react';

// 1️⃣ Create Context
const AuthContext = createContext();

// 2️⃣ Provider Component
export const AuthProvider = ({ children }) => {
  // Example state: user info & login status
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);
