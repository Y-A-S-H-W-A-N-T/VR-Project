import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  useEffect(() => {
    if (localStorage.getItem('userId') === null) {
      localStorage.removeItem('userId','isAdmin');
    }
  }, []);

  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

  useEffect(() => {
    if (userId !== null && userId !== undefined) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('isAdmin', isAdmin);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('isAdmin');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('error----------------------------');
  }
  return context;
};
