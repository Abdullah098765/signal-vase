"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Search from "./search.js";
import { MyContextProvider } from "@/app/context/context";
import Navbar from "@/app/components/navbar.js";
import Modal from "@/app/components/signUp-Model";
import Sidebar from "@/app/components/sidebar";
import RouterLoading from "@/app/components/routerLoading";
export default function Page() {

  return (
    <div>
      <MyContextProvider>
        <RouterLoading />
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Search  />
        </div>
        <Modal />
      </MyContextProvider>
    </div>
  );
}

// Slice
//2 andey
// pancil or rabar
