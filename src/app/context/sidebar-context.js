// context/SidebarContext.js
'use client'

import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

export const SidebarContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, activeSubmenu, setActiveSubmenu }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
