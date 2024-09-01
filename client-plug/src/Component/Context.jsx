'use client';
import React, { useContext, useEffect, useState } from 'react';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const url = 'http://localhost:3000/';

  // Check if running in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Safely access localStorage
      const storedUser = localStorage.getItem("user") || "";
      const storedToken = localStorage.getItem("token") || "";
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{
      token,
      setToken,
      url,
      user,
      setUser,
      showLogin,
      setShowLogin
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
