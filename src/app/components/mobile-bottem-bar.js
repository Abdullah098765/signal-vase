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
    return (
        <nav className={`bottomBar bg-gray-900 text-white p-4 flex items-center justify-around fixed bottom-0 left-0 right-0 md:hidden ${visible ? 'bottom-navbar-visible' : 'bottom-navbar-hidden'}`}>
            {/* Home Icon */}
            <button className="text-gray-400 hover:text-gray-100">

                <FontAwesomeIcon icon={faHome} />

            </button>

            {/* Explore Icon */}
            <button className="text-gray-400 hover:text-gray-100">
                <FontAwesomeIcon icon={faHistory} />
            </button>

            {/* Notifications Icon */}
            <button className="text-gray-400 hover:text-gray-100">
                <FontAwesomeIcon icon={faBell} />
            </button>

            {/* Profile Icon */}
            <button className="text-gray-400 hover:text-gray-100">
                <FontAwesomeIcon icon={faUser} />
            </button>
        </nav>
    );
}

export default BottomNavbar;
