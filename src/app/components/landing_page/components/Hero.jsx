import React from "react";
import etherealCashIcon from "../../public/signalvase_logo.svg";
import iconButtonImage from "../../public/chevron-down.svg";
import Image from "next/image";

export default function HeroSection() {
  const handleScroll = () => {
    const target = document.getElementById("intro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      id="home"
      onClick={() => console.log("Navbar clicked")}
      className="relative flex items-center justify-center h-screen"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center p-6 mt-16">
        <div className="mb-4 ">
          <Image
            alt="EtherealCash Icon"
            src={etherealCashIcon}
            width={500}
            height={500}
            className="mx-auto animate-pulse"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 ">
          Welcome to Signal Vase
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          A Social Media Platform for Traders and Investors. Connect, share, and
          grow with a community of like-minded professionals.
        </p>
        <button
          onClick={handleScroll}
          className="px-6 py-3 bg-transparent text-black rounded-md transition duration-300"
        >
          <Image
            src={iconButtonImage}
            alt="Icon Button"
            width={50}
            height={50}
            className="mx-auto animate-bounce"
          />
        </button>
      </div>
    </div>
  );
}
