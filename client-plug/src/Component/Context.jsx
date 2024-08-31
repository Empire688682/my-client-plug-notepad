'use client';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const GlobalContext = React.createContext();

export const GlobalProvider= ({children}) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const url = 'http://localhost:3000/';

    
  // Function to get user token from cookies
  const getUserToken = () => {
    try {
      // Fetch token from cookies
      const token = Cookies.get('token') || ''; // Use js-cookie to fetch token from cookies

      if (!token) {
        throw new Error('Token not found');
      }

      // Decode the token using jwt
      const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_KEY); // Use a public env variable for client-side
      return decodedToken.userId;
    } catch (error) {
      console.log('getUserToken', error);
      return { success: false, message: 'ERROR' };
    }
  };

  // Function to fetch token
  const fetchToken = async () => {
    try {
      const userToken = getUserToken(); // Call function to get user token

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

  // Fetch token on component mount
  useEffect(() => {
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
