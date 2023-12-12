// components/Navbar.js
'use client'

import './components.css'
import { useEffect, useRef, useState, createContext, useContext, } from 'react';
import { useMyContext } from '../context/context';
import { firebaseConfig } from "../../../firebaseConfig";
import { BellIcon } from '@heroicons/react/solid';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBackspace, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import logo from "../../../assets/logo.svg";
import Notification_Icon from '@/app/components/notification-icon'

const Navbar = () => {
    const auth = getAuth();
    const [uid, setUid] = useState(null);
    useEffect(() => {

        setUid(localStorage.getItem('uid'))
        console.log(uid);

    }, [])
    const router = useRouter();


    // const [isOpen, setIsOpen] = useState(false);
    const { isOpen, setIsOpen, routerLoading,getSignals, setRouterLoading,getSearchResult, setIsSliderOpen, isSliderOpen, closeSidenav, isModalOpen, setIsModalOpen, user,setSearchString,searchString } = useMyContext();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleSidenav = () => {
        setIsOpen(!isOpen);
    };
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

    const [searchVisible, setSearchVisible] = useState(false);


    const toggleSearch = () => {
        setRouterLoading(true)
        router.back()
    };
    const searchInputRef = useRef(null);
    const searchParams = usePathname();

    useEffect(() => {
        if (searchVisible) {
            // Focus the search input when it becomes visible
            searchInputRef.current.focus();
        }
      

        
    }, [searchVisible]);


    useEffect(() => {
        const urlParts = window.location.href.split("search=");
        console.log(urlParts);

       if(urlParts.length > 1){
        setSearchVisible(true) 
        setSearchString(decodeURIComponent(urlParts[urlParts.length - 1]))
       }
       else        setSearchVisible(false);

     
    }, [])
    const _signOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
      

            fetch('https://signal-hub.vercel.app/api/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid }),
            })
                .then(response => response.json())
                .then(data => {
                    window.location = 'https://signal-hub.vercel.app/' + pathname
                    localStorage.removeItem('uid')
                    localStorage.removeItem('userId')
                })
                .catch(error => console.error('Error:', error));
        }).catch((error) => {
            // An error happened.
            console.error("Sign-out error:", error);
        });
    }


  const handleKeyPress = (event) => {
  
          // Check if the pressed key is 'Enter' (key code 13)
          if (event.key === 'Enter') {

            // Call your search function here
            if (event.target.value !== "") {
            handleSearch();
                
            }
          }
        };
      
        const handleSearch = () => {
            if (searchString.trim() !== "") {
                // Remove leading and trailing whitespaces and check if the string is not empty
                // router.push("/search?search=" + encodeURIComponent(searchString));
                console.log('Performing search...');
                getSearchResult(searchString)
                // Your search logic goes here
                // You can call your API or update the state based on the search criteria
              } else {
                console.log('Invalid search string. Please enter a valid search.');
              }
              
              
        };
      

    if (!user) return null

    return (

        <>

            <nav className="bg-gray-900 text-white p-1 hidden md:block">
                <div className="container ml-4 mx-auto flex justify-between items-center">

                    {/* Branding or Logo */}
                    <div className="text-2xl font-semibold cursor-pointer flex">
                        <button name='lines' onClick={
                            () => closeSidenav(!isSliderOpen, true)
                        }
                            className="hamburger
                        -icon  focus:outline-none"
                        >
                            <div className="w-4 h-0.5 bg-gray-400 mb-1"></div>
                            <div className="w-3 h-0.5 bg-gray-400 mb-1"></div>
                            <div className="w-2 h-0.5 bg-gray-400"></div>
                        </button>
                        <Image
                            priority
                            className='m-3'
                            height={100}
                            width={100}
                            src={logo}
                            alt="Logo"
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="w-1/3 relative">
                        <input
                            type="text"
                            placeholder="Search signals"
                            className="w-120 px-3 py-2 rounded-full pl-10 bg-gray-800 text-gray-100 focus:outline-none focus:bg-gray-700"
                          onKeyPress={handleKeyPress}
                          onChange={(event)=>{
                            if (event.target.value === "") {
                                console.log('Empty search.');
                        
                                getSignals()
                              }
                            setSearchString(event.target.value)}}
                          value={searchString}
                      
                      />
                        <div  onClick={()=>handleSearch()} className="absolute inset-y-0 left-0 cursor-pointer  pl-3 flex items-center pointer-events-none">
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


                        {uid != null && <button onClick={() => {
                            router.push('/signal_form')
                            setRouterLoading(true)
                        }} className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm ">
                            Create a Signal
                        </button>}
                        {/* <BellIcon className=' h-6 w-6 text-gray-100 hover:text-gray-400' /> */}

                    </div>


             <div >
    <Notification_Icon/>
              </div>
                    {/* User Profile */}
                    <div className="flex items-center space-x-4">

                        <div className="absolute right-5 group">
                            {uid === null ? <button name='signin' onClick={() => {
                                setIsModalOpen(true)
                            }} className="bg-gray-700 text-white px-4 py-2 rounded hover:text-blue-400 text-sm ">
                                Sign In
                            </button> : <button name='profile'
                                onClick={toggleMenu}
                                className="flex items-center space-x-2 focus:outline-none"
                            >

                                <div className="rounded-full overflow-hidden h-10 w-10">
                                    <img
                                    ></img>
                                    {user.profilePicture && <Image
                                        priority
                                        className='profile-pic-nav w-full h-full object-cover  object-center'
                                        height={100}
                                        width={100}
                                        src={user.profilePicture}
                                        alt='profile-pic'


                                    />}

                                </div>
                            </button>
                            }

                            {isOpen && (
                                <ul
                                    className="absolute right-0 mt-2 w-40 bg-gray-900 text-gray-100 border border-gray-700 rounded-md shadow-lg z-10"
                                    onClick={closeMenu}
                                >
                                    {/* Add dropdown menu items */}

                                    <li onClick={() => {
                                        _signOut()
                                    }} className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Sign Out</li>
                                </ul>
                            )}
                        </div>

                        {/* Add user profile image here */}
                    </div>
                </div>
            </nav >

            <nav className={`unvisible-navbar bg-gray-900 text-white pr-2 flex items-center justify-between md:hidden  mb-14`} />

            <nav className={`navbar bg-gray-900 text-white  flex items-center  md:hidden  ${searchVisible ? 'justify-end' : 'justify-between'} ${visible ? 'navbar-visible' : 'navbar-hidden'}`}>


                {/* Left Side: Logo */}
                {!searchVisible && <div className="flex items-center">
                    <Image
                        priority
                        className='m-3'
                        width={80}
                        src={logo}
                        alt="Logo"
                    />
                </div>
                }
                {/* Right Side: Search, Create, Profile */}
                <div className={`flex items-center ${searchVisible ? ' w-full' : ''} `}>



                    <div className={`mobile-navbar flex flex-row  justify-around items-center ${searchVisible ? ' w-full' : ''}`}>
                        {/* Search Icon */}


                        {/* Search Input Field */}

                        <div


                            className={`search-container ${searchVisible ? 'active flex w-full flex-row items-center relative' : ''}`}>
                            <div className='text-white cursor-pointer absolute ml-2' onClick={()=>{
                                if(searchString ){
                                toggleSearch()
                            }
                           else setSearchVisible(false)

                            }}>

                                <FontAwesomeIcon icon={faArrowLeft} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input w-120 px-3 py-2 pl-6 pr-10 bg-gray-800 text-gray-100 focus:outline-none focus:bg-gray-700"
                                ref={searchInputRef}
                                onKeyPress={handleKeyPress}
                                onChange={(event)=>{
                                    if (event.target.value === "") {
                                        console.log('Empty search.');
                                
                                        getSignals()
                                      }
                                    setSearchString(event.target.value)}}
                                value={searchString}
                                 />
                      <div onClick={() => { searchString !== "" && handleSearch()}} className="absolute inset-y-0 right-0 cursor-pointer pr-3 flex items-center" style={{ zIndex: 1 }}>
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


                    </div>

                    {
                        !searchVisible && <button
                            className="text-gray-400 hover:text-gray-100 mr-2"
                        >
                            <svg
                                onClick={()=>setSearchVisible(true)}

                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
                                <circle cx="10" cy="10" r="7" />
                            </svg>
                        </button>
                    }
                    {/* Create Icon */}
                    {!searchVisible && <button className="text-gray-400 hover:text-gray-100">
                        {/* Your create icon */}
                    </button>}

                    {/* Profile Picture */}
                    {!searchVisible && <div className="relative">
                        {uid === null ? <div name='signin' onClick={() => {
                            setIsModalOpen(true)
                        }} className=" hover:text-blue-400 cursor-pointer text-sm mr-2">
                            Sign In
                        </div> :
                            <>

                                <img
                                    onClick={toggleMenu}
                                    className="h-8 w-8 mr-3 ml-3 object-cover cursor-pointer rounded-full"
                                    src={user.profilePicture}
                                    alt="Profile"
                                />




                                {isOpen && (
                                    <ul
                                        className="absolute right-0 mt-2 w-40 bg-gray-900 text-gray-100 border border-gray-700 rounded-md shadow-lg z-10"
                                        onClick={closeMenu}
                                    >
                                        {/* Add dropdown menu items */}

                                        <li onClick={() => {
                                            setRouterLoading(true)
                                            router.push('/profile')
                                        }} className="py-2 px-4 hover:bg-gray-800 cursor-pointer">My Profile</li>
                                        <li onClick={() => {
                                            _signOut()
                                        }} className="py-2 px-4 hover:bg-gray-800 cursor-pointer">Sign Out</li>
                                    </ul>
                                )}
                            </>}
                    </div>}
                </div>
            </nav>


        </>
    );
};

export default Navbar;
