"use client";
import Navbar from "../components/navbar.js";
import { MyContextProvider } from "../context/context.js";
import Sidebar from "../components/sidebar.js";
import SignalCardList from "../components/cardList.js";
import Modal from "../components/signUp-Model.js";
import SignalModal from "../components/signalModal.js";
import BottomNavbar from "../components/mobile-bottem-bar.js";
import RouterLoading from "../components/routerLoading.js";
import "firebase/auth";

import Head from "next/head.js";
export default function page() {
  return (
    <div className="">
      <MyContextProvider>
        <RouterLoading />
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
