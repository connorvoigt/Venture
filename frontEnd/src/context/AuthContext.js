import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you would fetch the user data with the token
      setUser({ email: 'test@example.com' }); // Placeholder for actual user data fetching
    }
  }, []);

  const login = (email, password) => {
    // Perform login and set user
    // Example: setUser({ email });
  };

  const register = (email, password) => {
    // Perform registration and set user
    // Example: setUser({ email });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
