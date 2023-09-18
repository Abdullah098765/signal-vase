"use client";

import Navbar from "./components/navbar.js";
import { MyContextProvider } from "./context/context.js";
import { useMyContext } from "./context/context";
import Sidebar from "./components/sidebar.js";
import SignalCardList from "./components/cardList.js";
import Modal from "./components/signUp-Model.js";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
export default function Home() {
  return (
    <div>
      <MyContextProvider>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <SignalCardList />
        </div>
        <Modal />
      </MyContextProvider>
    </div>
  );
}
