'use client';
import React, { useContext, useState } from 'react'

const GlobalContext = React.createContext();

export const GlobalProvider= ({children}) => {
    const [token, setToken] = useState(true);

    const logOutUser = () => {
        setToken(false);
    };
  return (
    <div>
      <GlobalContext.Provider value={{
        token,
        setToken,
        logOutUser
      }}>
        {children}
      </GlobalContext.Provider>
    </div>
  )
}

export const useGlobalContex = () =>{
    return useContext(GlobalContext);
}
