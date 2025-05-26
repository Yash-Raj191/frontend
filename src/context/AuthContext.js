import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // Store user info (e.g., {name, email, role})
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // Login function
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  // You can expand this context with more features as needed

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
