// context/MyContext.js
'use client'

import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

 

  return (
    <MyContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MyContext.Provider>
  );
};
