// components/Sidebar.js

'use client'

import './components.css'
import { useMyContext } from '../context/context';
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClock, faGear, faUser, } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/navigation';

function Sidebar() {
    const router = useRouter()
    const { isSliderOpen, setRouterLoading, setIsSliderOpen, isOpen, } = useMyContext();
    const [selectedLink, setSelectedLink] = useState('');

    return (
        <div className='hidden md:block' >
            {
                <div className={` bg-gray-900   sidebar-visible h-full   transition-transform ${isSliderOpen ? 'translate-x-0 open' : '-translate-x-full close'}`}>
                </div>

            }
            {


                <div className={` fixed    sidebar h-full   transition-transform ${isSliderOpen ? 'translate-x-0 open' : '-translate-x-full close'} `}>


                    <div id="Main" class="xl:rounded-br transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-52 bg-gray-900 flex-col">

                        {/* <div class="hidden xl:flex justify-start p-6 items-center space-x-3">
                <img className='max-h-20' src='https://firebasestorage.googleapis.com/v0/b/olx-app-9a451.appspot.com/o/lofgo.PNG?alt=media&token=f6086fb3-a383-4a4d-ab0a-57b628854e37'></img>

                </div> */}
                        <div class="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
                            <div onClick={() => {
                                setRouterLoading(true)
                                router.push('/')
                                setSelectedLink('Home')
                                console.log(selectedLink);

                            }} class={`${selectedLink === 'Home' ? 'text-indigo-400' : ''} flex jusitfy-start items-center space-x-6 w-full cursor-pointer  focus:outline-none  focus:text-indigo-400   text-white rounded `}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" /> <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" /> </svg>
                                <p class="text-base leading-4 ">Home</p>
                            </div>
                            <div onClick={() => {
                                setRouterLoading(true)
                                router.push('/profile')
                                setSelectedLink('Dashboard')
                                console.log(selectedLink);
                            }}
                                className={`${selectedLink === 'Dashboard' ? 'text-indigo-400' : ''} flex jusitfy-start cursor-pointer items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400   text-white rounded `}
                            >
                                <FontAwesomeIcon icon={faUser} width="24" height="24" />
                                <p class="text-base leading-4 ">Profile</p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-start      border-b border-gray-600 w-full  ">

                            <div id="menu1" class="flex justify-start  flex-col w-full md:w-auto items-start pb-1 ">
                                <div onClick={() => {
                                    
                                    setRouterLoading(true)

                                    router.push('/following-signals')
                                }} className="flex justify-start cursor-pointer items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52">

                                    <FontAwesomeIcon icon={faClock} width="24" height="24" />

                                    <p className="text-base leading-4">Following</p>
                                </div>

                                <Link href={'https://signal-hub.vercel.app/'} class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                    <FontAwesomeIcon icon={faBell} width="24" height="24" />

                                    <p class="text-base leading-4  ">Subscriptions</p>
                                </Link>

                                <Link href={'https://signal-hub.vercel.app/'} class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p class="text-base leading-4  ">Notifications</p>
                                </Link>



                                <Link href={'https://signal-hub.vercel.app/'} class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 21H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10 21V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10 4L19 8L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p class="text-base leading-4  ">Our Goals</p>
                                </Link>
                            </div>
                        </div>




                    </div>
                </div>}
        </div>
    );
}

export default Sidebar;
