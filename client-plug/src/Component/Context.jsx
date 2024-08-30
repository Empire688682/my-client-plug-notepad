'use client';
import { getUserToken } from '@/helpers/getUserToken';
import React, { useContext, useEffect, useState } from 'react'

const GlobalContext = React.createContext();

export const GlobalProvider= ({children}) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const url = 'http://localhost:3000/';

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const userToken = await getUserToken();
                
                if (userToken?.success === false) {
                    // Handle error if token retrieval fails
                    console.log(userToken.message);
                    setToken(null);
                } else {
                    setToken(userToken);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    // While loading, you might want to show a spinner or a loading state
    if (loading) return <div style={{minWidth:"100px", backgroundColor:"gray", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>Loading...</div>;

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
