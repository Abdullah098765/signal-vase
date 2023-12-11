// context/MyContext.js
"use client";

import { getMessaging, getToken } from "firebase/messaging";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { app } from "../../../firebaseConfig";
import { isSupported } from "firebase/messaging";

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [signals, setSignals] = useState([]);
  const [selectedSignal, setSelectedSignal] = useState({});
  const [isSignalModalOpen, setisSignalModalOpen] = useState(false);
  const [routerLoading, setRouterLoading] = useState(false);
  const [searchString, setSearchString] = useState();

  const [lineClicked, setLineClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const closeSidenav = (is, lineClicked) => {
    setIsSliderOpen(is);
    console.log(isSliderOpen);
    if (lineClicked) {
      setLineClicked(true);
    }
  };

  const getUser = () => {
    var raw = JSON.stringify({
      uid: localStorage.getItem("uid")
    });

    var requestOptions = {
      method: "POST",
      // headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://signal-hub.vercel.app/api/get-user", requestOptions)
      .then(response => response.text())
      .then(result => setUser(JSON.parse(result)))
      .catch(error => console.log("error", error));
  };

  const getSignals = () => {
    fetch("https://signal-hub.vercel.app/api/get-signals", { method: "POST" })
      .then(response => response.text())
      .then(result => setSignals(JSON.parse(result)))
      .catch(error => console.log("error", error));
  };
  const _setIsModalOpen = (is, signal) => {
    setIsModalOpen(is);
    console.log(is, signal);
  };

  function _setIsEditModalOpen(params) {
    setIsEditModalOpen(params);
  }

  const requestPermission = messaging => {
    console.log("Requesting permission...");
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        getToken(messaging, {
          vapidKey:
            "BDNMwTMS6c_6GqVeqkvkhTuTK71hb8auGJIdA5zJJjYJd7_or_TGDrQhmmLDmMiqlmZAnJzE82Ylv9LW1Omeptk"
        })
          .then(currentToken => {
            if (currentToken) {
              fetch("https://signal-hub.vercel.app/api/store-fcm-token", {
                method: "POST",
                body: JSON.stringify({
                  userId: user._id,
                  fcmToken: currentToken
                })
              });
              console.log(
                "Send the token to your server and update the UI if necssary",
                currentToken
              );
            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch(err => {
            console.log("An error occurred while retrieving token. ", err);
          });
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("uid")) {
      getUser();
    }
    getSignals();
  }, []);
  useEffect(
    () => {
      user &&
        isSupported().then(hasFirebaseMessagingSupport => {
          console.log(hasFirebaseMessagingSupport);
          if (hasFirebaseMessagingSupport) {
            const messaging = getMessaging(app);
            requestPermission(messaging);
          }
        });
    },
    [user]
  );

  if (routerLoading) {
    setTimeout(() => {
      setRouterLoading(false);
    }, 10000);
  }

  return (
    <MyContext.Provider
      value={{
        setSearchString,
        searchString,
        _setIsModalOpen,
        routerLoading,
        setRouterLoading,
        _setIsEditModalOpen,
        closeSidenav,
        isEditModalOpen,
        setIsEditModalOpen,
        lineClicked,
        selectedSignal,
        setSelectedSignal,
        getSignals,
        isSignalModalOpen,
        setisSignalModalOpen,
        isOpen,
        setIsOpen,
        isSliderOpen,
        closeSidenav,
        isModalOpen,
        signals,
        setSignals,
        getUser,
        setIsModalOpen,
        user,
        setUser
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
