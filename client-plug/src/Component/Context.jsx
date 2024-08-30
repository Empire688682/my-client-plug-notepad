'use client';
import React, { useContext, useState } from 'react'

const GlobalContext = React.createContext();

export const GlobalProvider= ({children}) => {
    const [token, setToken] = useState(true);
    const url = ''
    const user = "Jayempire"

  return (
      <GlobalContext.Provider value={{
        token,
        setToken,
        url,
        user
      }}>
        {children}
      </GlobalContext.Provider>
  )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext);
}
