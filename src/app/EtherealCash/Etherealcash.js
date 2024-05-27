"use client";
import React, { useEffect } from "react";
import { FaCog } from "react-icons/fa"; // Import the desired icon from react-icons library
import { useMyContext } from "../context/context";

function EtherealCash() {
  const { setRouterLoading } = useMyContext();

  useEffect(() => {
    setRouterLoading(false);
  }, [setRouterLoading]);

  return (
    <div className="flex w-full mt-24 justify-center h-screen text-gray-800">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full">
        <FaCog className="text-black text-5xl mb-4" />
        <p className="text-lg font-semibold mb-2">
          Ethereal Cash is Under Development
        </p>
        <p className="text-sm text-center mb-4">
          EtherealCash (ERCH) is a decentralized digital currency that serves as the exclusive currency within the Ethereal ecosystem, which includes the Signal Hub, payment systems, decentralized applications (dApps), and community platforms. This ecosystem is designed to facilitate secure and efficient financial activities, ensuring a seamless and integrated experience for users. Use EtherealCash to purchase signals or subscribe to premium signal providers on Signal Hub. Exciting features coming soon!
          <br /><br />
          We invite investors to join us in revolutionizing the trading signal industry. By investing in EtherealCash, you will be part of a dynamic ecosystem aimed at providing transparency, security, and efficiency in financial transactions. Together, we can build a future where both seasoned traders and newcomers can thrive in a trustworthy and innovative environment.
          <br /><br />
          Join us in this exciting journey and be a part of the future of digital finance!
        </p>
        <a 
          href="https://polygonscan.com/token/0x5769b9a9fa938c2f583b2a49776ff5ca59e0030a"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Token on Explorer
        </a>
      </div>
    </div>
  );
}

export default EtherealCash;
