"use client";

import Navbar from "./components/navbar.js";
import { MyContextProvider } from "./context/context.js";
import { useMyContext } from "./context/context.js";
import Sidebar from "./components/sidebar.js";
import SignalCardList from "./components/cardList.js";
import Modal from "./components/signUp-Model.js";
import SignalModal from "./components/signalModal.js";
import BottomNavbar from "./components/mobile-bottem-bar.js";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
import { useEffect } from "react";
import { io } from "socket.io-client";
export default function Home() {
  return (
    <div className="">
      <MyContextProvider>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <SignalCardList />
        </div>
        {/* <CreateSignalModal isOpen={true} onClose={()=>{}} /> */}

        <Modal />
        <SignalModal />
        <BottomNavbar />
      </MyContextProvider>
    </div>
  );
}
