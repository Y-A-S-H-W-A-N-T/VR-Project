import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  useEffect(() => {
    localStorage.removeItem('userId');
  }, []);

  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    localStorage.setItem('userId', userId);

    
    const clearLocalStorage = () => {
      localStorage.removeItem('userId');
      setUserId(null);
      
    };

    const timeoutId = setTimeout(clearLocalStorage, 900000); 

    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};