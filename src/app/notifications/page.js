import React from "react";
import Notifications from "./notifications";
import RouterLoading from "../components/routerLoading";
import Navbar from "../components/navbar";
import Modal from "../components/signUp-Model";
import { MyContextProvider } from "../context/context";
import Sidebar from "../components/sidebar";
import NotificationCardList from "./notification-list";
import BottomNavbar from "../components/mobile-bottem-bar";

export default function page() {
  return (
    <div>
      <MyContextProvider>
        <RouterLoading />

        <Navbar />
        <div className="flex">
          <Sidebar />
          <NotificationCardList />
          {/* <div className='w-full  bg-gray-200 md:p-8 p-4'>

                    </div> */}
        </div>
        <Modal />
        <BottomNavbar />
      </MyContextProvider>
    </div>
  );
}
