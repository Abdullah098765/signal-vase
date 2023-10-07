// context/MyContext.js
'use client'

import { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [signals, setSignals] = useState([])


  const [isOpen, setIsOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeSidenav = () => {
    setIsSliderOpen(!isSliderOpen)
    console.log(isSliderOpen);
  };

  const getUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("a", "dni");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "uid": localStorage.getItem('uid')
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/get-user", requestOptions)
      .then(response => response.text())
      .then(result => setUser(JSON.parse(result)))
      .catch(error => console.log('error', error));

  };
  const getSignals = () => {



    fetch("http://localhost:3000/api/get-signals")
      .then(response => response.text())
      .then(result => setSignals(JSON.parse(result)))
      .catch(error => console.log('error', error));

  };
  useEffect(() => {
    getUser()
    getSignals()

  }, [])







  return (
    <MyContext.Provider value={{ isOpen, setIsOpen, isSliderOpen, closeSidenav, isModalOpen, signals, setSignals, getUser, setIsModalOpen, user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
