'use client'
import { faAdd, faBell, faHistory, faHome, faPlus, faPlusCircle, faPlusSquare, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './components.css'
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';
import { useMyContext } from '../context/context';

function BottomNavbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const router = useRouter()
    const pathName = usePathname()

    const { routerLoading, setRouterLoading } = useMyContext()
    useEffect(() => {
        console.log(pathName);
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

    const [activeIcon, setActiveIcon] = useState(pathName); // Set an initial active icon

    const handleIconClick = (iconName) => {
        // setActiveIcon(iconName);
    };
    return (
        <>

            <nav className={`bottomBar bg-gray-900 text-white p-2 flex items-center justify-around fixed bottom-0 left-0 right-0 md:hidden ${visible ? 'bottom-navbar-visible' : 'bottom-navbar-hidden'}`}>
                {/* Home Icon */}
                <button
                    className={`text-gray-400  ${activeIcon === '/' ? 'bottam_icon' : ''}`}
                    onClick={() => {
                        setRouterLoading(true)
                        router.push('/')
                        handleIconClick('/')
                    }}
                >
                    <FontAwesomeIcon icon={faHome} />
                </button>

                {/* Explore Icon */}
                <button
                    className={`text-gray-400  ${activeIcon === '/following-signals' ? 'bottam_icon' : ''}`}
                    onClick={() => {
                        handleIconClick('/following-signals')
                        setRouterLoading(true)
                        router.push('/following-signals')
                    }}
                >
                    <FontAwesomeIcon icon={faHistory} />
                </button>

                {/* Notifications Icon */}
                <button
                    className={`text-gray-400  ${activeIcon === '/signal_form' ? 'bottam_icon' : ''}`}
                    onClick={() => {
                        setRouterLoading(true)
                        handleIconClick('/signal_form')
                        router.push('/signal_form')
                    }}
                >
                    <svg width="30" height="30" viewBox="0 0 270 270" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="135" cy="135" r="128.5" stroke="white" stroke-width="13" />
                        <circle cx="135" cy="135" r="86.5" fill="white" stroke="black" stroke-width="7" />
                        <path d="M127.5 127V110C127.5 104.5 139.5 100 142.5 110V127H161C164.5 128.5 171 135.5 161 142.5H142.5V160C140 168 131 168 127.5 160V142.5H110C104.5 142.5 98.5 132.5 110 127H127.5Z" fill="#111827" stroke="black" />
                    </svg>
                </button>

                {/* Profile Icon */}
                <button
                    className={`text-gray-400  ${activeIcon === 'subscription' ? 'bottam_icon' : ''}`}
                    onClick={() => {
                        setRouterLoading(true)
                        router.push('subscription')
                    }}
                >
                    <FontAwesomeIcon icon={faUsers} />
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

        </>

    );
}

export default BottomNavbar;
