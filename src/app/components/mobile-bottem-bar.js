'use client'
import { faBell, faHistory, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './components.css'

function BottomNavbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (prevScrollPos > currentScrollPos) {
                setVisible(true);
            } else {
                setVisible(false);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const [activeIcon, setActiveIcon] = useState('home'); // Set an initial active icon

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName);
    };
    return (
        <nav className={`bottomBar bg-gray-900 text-white p-2 flex items-center justify-around fixed bottom-0 left-0 right-0 md:hidden ${visible ? 'bottom-navbar-visible' : 'bottom-navbar-hidden'}`}>
            {/* Home Icon */}
            <button
                className={`text-gray-400  ${activeIcon === 'home' ? 'bottam_icon' : ''}`}
                onClick={() => handleIconClick('home')}
            >
                <FontAwesomeIcon icon={faHome} />
            </button>

            {/* Explore Icon */}
            <button
                className={`text-gray-400  ${activeIcon === 'following' ? 'bottam_icon' : ''}`}
                onClick={() => handleIconClick('following')}
            >
                <FontAwesomeIcon icon={faHistory} />
            </button>

            {/* Notifications Icon */}
            <button
                className={`text-gray-400  ${activeIcon === 'notifications' ? 'bottam_icon' : ''}`}
                onClick={() => handleIconClick('notifications')}
            >
                <FontAwesomeIcon icon={faBell} />
            </button>

            {/* Profile Icon */}
            <button
                className={`text-gray-400  ${activeIcon === 'profile' ? 'bottam_icon' : ''}`}
                onClick={() => handleIconClick('profile')}
            >
                <FontAwesomeIcon icon={faUser} />
            </button>
            <button
                className={`text-gray-400 signal-Icon ${activeIcon === 'signalHub' ? 'bottam_icon' : ''}`}
                onClick={() => handleIconClick('signalHub')}
            >

                <svg className='text-gray-400' width={` ${activeIcon === 'signalHub' ? '20' : '16'}`} height={` ${activeIcon === 'signalHub' ? '20' : '16'}`} viewBox="0 0 67 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 65.5L24.5 6.00001C27.5 2.00001 35 -4 42 6.00001L44.2389 11.5L65 62.5C67.5 73 65 75.5 58 78.5H11C4.5 77 0.5 73.5 0.5 65.5Z" fill="white" stroke="black" />
                    <path d="M47.5 32C42.5 42 25.5 52 11.5 52L28.5 8.50001C30.1667 8.50001 32.5 4 37.5 8.50001L47.5 32Z" fill="#111827" stroke="black" />
                </svg>

            </button>
        </nav>
    );
}

export default BottomNavbar;
