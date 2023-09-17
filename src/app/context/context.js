// context/MyContext.js
'use client'

import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(true);
  const closeSidenav = () => {
    setIsSliderOpen(!isSliderOpen)
    console.log(isSliderOpen);
  };


  return (
    <MyContext.Provider value={{ isOpen, setIsOpen, isSliderOpen, closeSidenav }}>
      {children}
    </MyContext.Provider>
  );
};
