// components/Navbar.js
'use client'

import './components.css'
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { useMyContext } from '../context/context';


import { BellIcon } from '@heroicons/react/solid';

const Navbar = () => {

    // const [isOpen, setIsOpen] = useState(false);
    const { isOpen, setIsOpen } = useMyContext();

    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        // Add a click event listener to the document body
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        // Attach the event listener when the dropdown is open
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        // Remove the event listener when the dropdown is closed or the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <nav className="bg-gray-900 text-white p-1">
            <div className="container mx-auto flex justify-between items-center">
                {/* Branding or Logo */}
                <a className="text-2xl font-semibold cursor-pointer">
                    <img className='max-h-20' src='https://firebasestorage.googleapis.com/v0/b/olx-app-9a451.appspot.com/o/lofgo.PNG?alt=media&token=f6086fb3-a383-4a4d-ab0a-57b628854e37'></img>
                </a>

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

                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-100 hover:text-gray-400"
                        fill=""
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    <BellIcon className=' h-6 w-6 text-gray-100 hover:text-gray-400' />

                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">

                    <div className="relative group">
                        <button
                            onClick={toggleMenu}
                            className="flex items-center space-x-2 focus:outline-none"
                        >

                            <div className="rounded-full overflow-hidden h-10 w-10">
                                <img className='profile-pic-nav w-full h-full object-cover object-center' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKcdDmMmOM4ojyKC7ye7tPaHYMjDtJs3gRg&usqp=CAU'></img>
                            </div>
                        </button>

                        {isOpen && (
                            <ul
                                className="absolute right-0 mt-2 w-40 bg-gray-900 text-gray-100 border border-gray-700 rounded-md shadow-lg z-10"
                                onClick={closeMenu}
                            >
                                {/* Add dropdown menu items */}
                                <li className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Item 1</li>
                                <li className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Item 2</li>
                                <li className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Item 3</li>
                            </ul>
                        )}
                    </div>

                    {/* Add user profile image here */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
