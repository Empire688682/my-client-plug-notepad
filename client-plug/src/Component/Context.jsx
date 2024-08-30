'use client';
import React, { useContext, useState } from 'react'

const GlobalContext = React.createContext();

export const GlobalProvider= ({children}) => {
    const [token, setToken] = useState(true);
    const url = ''

    const logOutUser = () => {
        setToken(false);
    };
  return (
      <GlobalContext.Provider value={{
        token,
        setToken,
        logOutUser,
        url
      }}>
        {children}
      </GlobalContext.Provider>
  )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext);
}
