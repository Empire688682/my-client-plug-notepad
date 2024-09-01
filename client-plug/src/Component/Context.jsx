'use client';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const GlobalContext = React.createContext();

export const GlobalProvider= ({children}) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user") || "");
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const url = 'http://localhost:3000/';

    useEffect(()=>{
      setToken(localStorage.getItem("token") || "");
    },[token]);

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
  )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext);
}
