import React from "react";
import EtherealCash from "./Etherealcash";
import { MyContextProvider } from "../context/context";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import RouterLoading from "../components/routerLoading";
import BottomNavbar from "../components/mobile-bottem-bar";

function page() {
  return (
    <div>
      <MyContextProvider>
        <RouterLoading />

        <Navbar />
        <div className="flex ">
          <Sidebar />
          <EtherealCash />
        </div>
        <BottomNavbar />
      </MyContextProvider>
    </div>
  );
}

export default page;
