"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyContextProvider, useMyContext } from "../context/context.js";
import {
  faAdd,
  faChartArea,
  faChartLine,
  faCheck,
  faClose,
  faCross,
  faLineChart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBarChart,
  faChartBar,
  faEdit,
} from "@fortawesome/free-regular-svg-icons";
import Career from "./creer.js";
import PersonalInfo from "./personalInfor.js";

import Reviews from "./reviews.js";
import About from "./About.js";
import EditButtons from "./editButtons.js";
import "./components.css";
import { useEffect, useState } from "react";
import SignalsPieChart from "./career-chart.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import the ScrollToPlugin
import ShareModal from "./shareModal.js";
import gsap from "gsap";
import SignalModal from "./signalModal.js";
import EditProfileModal from "./edit-profile-modal.js";
import { usePathname } from "next/navigation";
import ProfileSignalCards from "./profile-signal-cards.js";
import { auth } from "../../../firebaseConfig.js";
import { useAuthState } from 'react-firebase-hooks/auth';


function ProfileContent() {
  const [currentUser, loading, error] = useAuthState(auth);

  const { user, setRouterLoading, isModalOpen, setIsModalOpen } =
    useMyContext();
  const [isScrolled, setIsScrolled] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [currentprofileRoute, setIsCurrentprofileRoute] = useState("All");
  gsap.registerPlugin(ScrollToPlugin); // Register the plugin

  useEffect(() => {
    if (window.location.search === "?review=true") {
      setIsCurrentprofileRoute("Reviews");
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the page when isCurrentprofileRoute changes
    if (currentprofileRoute === "Reviews") {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth", // You can use 'auto' for instant scroll
        });
      }, 1000);
    }
  }, [currentprofileRoute]);

  function handleGetRoute(params) {
    setIsCurrentprofileRoute(params);
  }
  const [isSignInButtinShown, setIsSignInButtinShown] = useState(false);

  useEffect(() => {
    setRouterLoading(false);
    if (user) {
      setIsLoading(false);
    }
    if (!currentUser && !loading) {
      setIsModalOpen(true);
      setIsSignInButtinShown(true);
    }
  }, [user]);

  const handleScroll = (direction) => {
    const scrollContainer = document.getElementById("scroll-container");

    if (scrollContainer) {
      if (direction === "left" && isScrolled <= 2) {
        gsap.to(scrollContainer, { x: "-=100", duration: 0.3 }); // Adjust the scroll distance and duration as needed
        setIsScrolled(isScrolled + 1);
      } else if (direction === "right" && isScrolled >= 2) {
        gsap.to(scrollContainer, { x: "+=100", duration: 0.3 }); // Adjust the scroll distance and duration as needed
        setIsScrolled(isScrolled - 1);
      }
    }
  };
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const openModal = () => {
    setIsShareModalOpen(true);
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
  };
  function formatRegistrationDate(timestamp) {
    const date = new Date(timestamp);

    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <>
      <div className="w-full">
        {user.displayName && (
          <div class="h-full bg-gray-200 md:p-8 p-4 w-full">
            <div class="bg-white rounded-lg shadow-xl p-6 flex flex-col lg:flex-row  xl:flex-row items-center">
              <div
                x-data="{ openSettings: false }"
                class="absolute right-12 mt-4 rounded"
              ></div>
              <img
                src={user.profilePicture}
                className="w-40 h-40 min-w-[10rem] min-h-[10rem] rounded-full mx-4 border-2 border-gray-500  transition duration-300 object-cover"
                alt={user.displayName}
              />

              <div className="">
                <div class="flex items-center space-x-2 lg:justify-start justify-center mt-2">
                  <p class="text-2xl">{user.displayName}</p>
                  <span class="bg-blue-500 rounded-full p-1" title="Verified">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-gray-100 h-2.5 w-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </span>
                </div>
                <p class="text-gray-700">{user.bio}</p>
                <p class="text-sm text-gray-500">
                  Joined at {formatRegistrationDate(user.registrationDate)}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  Subscribers {user.Subscribers.length}
                </p>
              </div>
              <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8">
                <ShareModal
                  isOpen={isShareModalOpen}
                  onRequestClose={closeModal}
                  id={user.fireBaseUid}
                  title={user.displayName}
                  isSignal={false}
                  url={
                    window.location.host + "/signal-provider/" + user.fIdHash
                  }
                />
                <div
                  className=" text-gray-600 cursor-pointer  hidden md:block rounded-md hover:text-gray-800 focus:outline-none"
                  onClick={openModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                  </svg>
                </div>
                <MyContextProvider>
                  <EditButtons />
                  {user && <EditProfileModal />}
                </MyContextProvider>
                <div
                  className=" text-gray-600 cursor-pointer mt-3 mtinsm  block md:hidden rounded-md hover:text-gray-800 focus:outline-none"
                  onClick={openModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <Career user={user} />
            <PersonalInfo user={user} />
            <div>
              <div class="w-full flex flex-col cursor-pointer mt-3">
                <div class="bg-white ">
                  <div className="relative overflow-hidden flex flex-row items-center sm:flex-col sm:items-stretch ">
                    <ul
                      className="flex scroll-controller cursor-pointer lg:flex-row lg:justify-around xl:flex xl:justify-around  justify-start"
                      id="scroll-container"
                    >
                      <li
                        onClick={() => handleGetRoute("All")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "All" ? "bg-gray-100" : ""
                          }`}
                      >
                        All
                      </li>
                      <li
                        onClick={() => handleGetRoute("Active")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Active" ? "bg-gray-100" : ""
                          }`}
                      >
                        Active
                      </li>
                      <li
                        onClick={() => handleGetRoute("Good")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Good" ? "bg-gray-100" : ""
                          }`}
                      >
                        Good
                      </li>
                      <li
                        onClick={() => handleGetRoute("Neutral")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Neutral" ? "bg-gray-100" : ""
                          }`}
                      >
                        Neutral
                      </li>
                      <li
                        onClick={() => handleGetRoute("Bad")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Bad" ? "bg-gray-100" : ""
                          }`}
                      >
                        Bad
                      </li>
                      <li
                        onClick={() => handleGetRoute("Crypto")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Crypto" ? "bg-gray-100" : ""
                          }`}
                      >
                        Crypto
                      </li>
                      <li
                        onClick={() => handleGetRoute("Stock")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Stock" ? "bg-gray-100" : ""
                          }`}
                      >
                        Stock
                      </li>
                      <li
                        onClick={() => handleGetRoute("About")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "About" ? "bg-gray-100" : ""
                          }`}
                      >
                        About
                      </li>
                      <li
                        onClick={() => handleGetRoute("Reviews")}
                        class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === "Reviews" ? "bg-gray-100" : ""
                          }`}
                      >
                        Reviews
                      </li>{" "}
                    </ul>
                    {isScrolled <= 2 && (
                      <div
                        className="absolute right-0 cursor-pointer sm:hidden"
                        onClick={() => handleScroll("left")}
                      >
                        &#9654;
                      </div>
                    )}
                    {isScrolled >= 2 && (
                      <div
                        className="absolute right-4 cursor-pointer sm:hidden"
                        onClick={() => handleScroll("right")}
                      >
                        &#9664;
                      </div>
                    )}
                    {/* Your content here */}
                  </div>
                </div>
              </div>
            </div>
            {<ProfileSignalCards currentprofileRoute={currentprofileRoute} user_id={user._id} />}
            {currentprofileRoute === 'Reviews' && <Reviews provider={user} />}
            {currentprofileRoute === 'About' && <About />}

          </div>
        )}

        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-white mt-4">Loading...</p>
          </div>
        )}

        {isSignInButtinShown && (
          <div className=" w-full flex items-center justify-center h-screen">
            <button
              onClick={() => setIsModalOpen(true)}
              className=" bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileContent;
