"use client";

import Navbar from "./components/navbar.js";
import { MyContextProvider } from "./context/context.js";
import { useMyContext } from "./context/context.js";
import Sidebar from "./components/sidebar.js";
import SignalCardList from "./components/cardList.js";
import Modal from "./components/signUp-Model.js";
import SignalModal from "./components/signalModal.js";
import BottomNavbar from "./components/mobile-bottem-bar.js";
import RouterLoading from "./components/routerLoading.js";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig.js";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Head from "next/head.js";
export default function Home() {
  return (
    <div className="">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <MyContextProvider>
        <RouterLoading/>
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
