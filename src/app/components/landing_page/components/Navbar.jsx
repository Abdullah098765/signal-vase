import React, { useEffect, useState } from 'react';
import { FiFeather, FiHome, FiMenu, FiStar } from 'react-icons/fi';
import { AiFillCompass, AiFillHome, AiFillStar, AiOutlineClose, AiOutlineRight } from 'react-icons/ai';
import { MdContactSupport, MdGroups } from 'react-icons/md';
import signalVaseLogo from "../../public/signalvase_logo_white.svg";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      if (router.asPath.includes('#')) {
        const id = router.asPath.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    router.events?.on('hashChangeComplete', handleHashChange);
    return () => {
      router.events?.off('hashChangeComplete', handleHashChange);
    };
  }, [router]);

  return (
    <> 
      <nav className={`p-[2.25rem] flex justify-between items-center fixed top-0 w-full z-50  transition-all duration-300 ${isScrolled && !isSidebarOpen? ' border-gray-700 backdrop-blur-[12px] bg-black bg-opacity-5' : ''}`}>
        <div className="text-white text-2xl font-bold cursor-pointer">
        <Image
                        alt="Signal_hub logo"
                        src={signalVaseLogo}
                        width={100}
                        height={100}
                        className=""
                    />
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="#home" className="text-white hover:text-gray-200 flex flex-row items-center gap-1">
            <AiFillHome /> Home
          </Link>
          <Link href="#feature" className="text-white hover:text-gray-200 flex flex-row items-center gap-1">
            <AiFillStar /> Project
          </Link>
          <Link target='_' href="https://polygonscan.com/token/0xe53b2a27dd87ced67f5b1ba4da9754505ac4cf60" className="text-white hover:text-gray-200 flex flex-row items-center gap-1">
            <AiFillCompass /> Explorer
          </Link>
          <Link href="#about" className="text-white hover:text-gray-200 flex flex-row items-center gap-1">
            <MdGroups /> About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200 flex flex-row items-center gap-1">
            <MdContactSupport /> Contact
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-white text-3xl z-50">
            {isSidebarOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>
        </div>
        <a  href='https://signalvase.com/home?signup=true' className="hidden md:block">
          Sign Up
        </a>

      </nav>

        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-64 backdrop-blur-[12px] bg-black bg-opacity-5 z-50 text-white transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <button onClick={toggleSidebar} className="text-white text-3xl m-4 left-48 relative">
            {isSidebarOpen ? <AiOutlineRight /> : <FiMenu />}
          </button>
          <div className="flex flex-col p-4 space-y-6 mt-12">
            <Link href="#home" onClick={toggleSidebar} className="hover:text-gray-200 flex flex-row items-center gap-1">
              <FiHome /> Home
            </Link>
            <Link href="#feature" onClick={toggleSidebar} className="hover:text-gray-200 flex flex-row items-center gap-1">
              <FiStar /> Project
            </Link>
            <Link target='_' href="https://polygonscan.com/token/0xe53b2a27dd87ced67f5b1ba4da9754505ac4cf60" className="text-white hover:text-gray-200 flex flex-row items-center gap-1">
              <AiFillCompass /> Explorer
            </Link>
            <Link href="#about" onClick={toggleSidebar} className="hover:text-gray-200 flex flex-row items-center gap-1">
              <MdGroups /> About Us
            </Link>
            <Link href="#" onClick={toggleSidebar} className="hover:text-gray-200 flex flex-row items-center gap-1">
              <AiOutlineClose /> Close
            </Link>
            <a   href='https://signalvase.com/home?signup=true' className="mt-4 bg-yellow-500 text-black rounded-md p-2 hover:bg-yellow-600 transition duration-300">Sign Up</a>
          </div>
        </div>
      </>
  );
}
