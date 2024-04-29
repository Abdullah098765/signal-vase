"use client";
import React, { useEffect } from "react";
import { FaCog } from "react-icons/fa"; // Import the desired icon from react-icons library
import { useMyContext } from "../context/context";

function EtherealCash() {
  const {

    setRouterLoading,
   
  } = useMyContext();
  useEffect(() => {
    setRouterLoading(false);
  }, []);
  return (
    <div className="flex mt-48 items-center justify-center webkit-fill-available text-gray-800">
      <div className="flex flex-col items-center">
        <FaCog className="text-black text-5xl mb-4" />
        <p className="text-lg font-semibold mb-2">
          Ethereal Cash is Under Development
        </p>
        <p className="text-sm text-center">
          Ethereal Cash is the exclusive currency on Signal Hub. Use it to
          purchase signals or subscribe to premium signal providers. Exciting
          features coming soon!
        </p>
      </div>
    </div>
  );
}

export default EtherealCash;
