// components/Navbar.js
'use client'

import './components.css'
import { useEffect, useRef, useState, createContext, useContext, } from 'react';
import { useMyContext } from '../context/context';
import { firebaseConfig } from "../../../firebaseConfig";
import { BellIcon } from '@heroicons/react/solid';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';

const Navbar = () => {
    const auth = getAuth();
    const uid = localStorage.getItem('uid')


    // const [isOpen, setIsOpen] = useState(false);
    const { isOpen, setIsOpen, setIsSliderOpen, isSliderOpen, closeSidenav, isModalOpen, setIsModalOpen, user } = useMyContext();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleSidenav = () => {
        setIsOpen(!isOpen);
    };



    return (
        <nav className="bg-gray-900 text-white p-1">
            <div className="container ml-4 mx-auto flex justify-between items-center">

                {/* Branding or Logo */}
                <div className="text-2xl font-semibold cursor-pointer flex">
                    <button onClick={
                        closeSidenav
                    }
                        className="hamburger
                        -icon  focus:outline-none"
                    >
                        <div className="w-4 h-0.5 bg-gray-400 mb-1"></div>
                        <div className="w-3 h-0.5 bg-gray-400 mb-1"></div>
                        <div className="w-2 h-0.5 bg-gray-400"></div>
                    </button>
                    <img className='max-h-20 ml-3' src='https://firebasestorage.googleapis.com/v0/b/olx-app-9a451.appspot.com/o/lofgo.PNG?alt=media&token=f6086fb3-a383-4a4d-ab0a-57b628854e37'></img>
                </div>

                {/* Search Bar */}
                <div className="w-1/3 relative">
                    <input
                        type="text"
                        placeholder="Search signals"
                        className="w-120 px-3 py-2 rounded-full pl-10 bg-gray-800 text-gray-100 focus:outline-none focus:bg-gray-700"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35"
                            />
                            <circle cx="10" cy="10" r="7" />
                        </svg>
                    </div>
                </div>


                {/* Navigation Links */}
                <div className="space-x-4 flex ">


                    {localStorage.getItem('uid') && <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm ">
                        <Link href={'http://localhost:3000/signal_form'}>Create a Signal</Link>
                    </button>}
                    {/* <BellIcon className=' h-6 w-6 text-gray-100 hover:text-gray-400' /> */}

                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">

                    <div className="absolute right-5 group">
                        {!localStorage.getItem('uid') ? <button onClick={() => {
                            setIsModalOpen(true)
                        }} className="bg-gray-700 text-white px-4 py-2 rounded hover:text-blue-400 text-sm ">
                            Sign In
                        </button> : <button
                            onClick={toggleMenu}
                            className="flex items-center space-x-2 focus:outline-none"
                        >

                            <div className="rounded-full overflow-hidden h-10 w-10">
                                <img className='profile-pic-nav w-full h-full object-cover object-center' src={user.profilePicture}></img>
                            </div>
                        </button>}

                        {isOpen && (
                            <ul
                                className="absolute right-0 mt-2 w-40 bg-gray-900 text-gray-100 border border-gray-700 rounded-md shadow-lg z-10"
                                onClick={closeMenu}
                            >
                                {/* Add dropdown menu items */}
                                <li className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Item 1</li>
                                <li className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Item 2</li>
                                <li onClick={() => {
                                    signOut(auth).then(() => {
                                        // Sign-out successful.

                                        var myHeaders = new Headers();
                                        myHeaders.append("a", "dni");
                                        myHeaders.append("Content-Type", "application/json");

                                        var raw = JSON.stringify({
                                            "uid": uid
                                        });

                                        var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            body: raw,
                                            redirect: 'follow'
                                        };

                                        fetch("http://localhost:3000/api/signout", requestOptions)
                                            .then(response => response.text())
                                            .then(result =>
                                                console.log("User signed out"))
                                        window.location = 'http://localhost:3000/'
                                        localStorage.removeItem('uid')
                                            .catch(error => console.log('error', error));
                                    }).catch((error) => {
                                        // An error happened.
                                        console.error("Sign-out error:", error);
                                    });
                                }} className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Delete Account</li>
                            </ul>
                        )}
                    </div>

                    {/* Add user profile image here */}
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
