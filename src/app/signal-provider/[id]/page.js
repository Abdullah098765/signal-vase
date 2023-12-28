'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyContextProvider, useMyContext } from '../../context/context';
import { faChartArea, faChartLine, faCheck, faClose, faCross, faLineChart, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faBarChart, faChartBar } from '@fortawesome/free-regular-svg-icons';
import Career from '../../components/creer'
import AllSignals from '../../components/all'
import GoodSignals from '../../components/good'
import BadSignals from '../../components/bad'
import NeutralSignals from '../../components/neutral'
import CryptoSignals from '../../components/crypto'
import ForexSignals from '../../components/forex'
import Subscribe from '../../components/Subscribe'
import ActiveSignals from '../../components/active'
import Reviews from '../../components/reviews'
import About from '../../components/About'
import '../../components/components.css'
import { useEffect, useState } from 'react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import gsap from 'gsap';
import SignalModal from '../../components/signalModal';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import EditButtons from '../../components/editButtons';
import { usePathname, useRouter } from 'next/navigation';
import RouterLoading from '@/app/components/routerLoading';
import ShareModal from '@/app/components/shareModal';
import Modal from '@/app/components/signUp-Model';
import BottomNavbar from '@/app/components/mobile-bottem-bar';
import ProfileSignalCards from '../../components/profile-signal-cards';

function User() {
    const router = useRouter()
    const searchParams = usePathname()

    const urlParts = searchParams.split('/');

    const [user, setUser] = useState();

    const [currentprofileRoute, setIsCurrentprofileRoute] = useState('All');

    const [pid, setPid] = useState(urlParts[urlParts.length - 1]);

    useEffect(() => {
        if (window.location.search === "?review=true") {
            setIsCurrentprofileRoute("Reviews");
        }
    }, [])

    useEffect(() => {
        // Scroll to the bottom of the page when isCurrentprofileRoute changes
        if (currentprofileRoute === "Reviews") {
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth', // You can use 'auto' for instant scroll
                });
            }, 3000);
        }
    }, [currentprofileRoute])

    useEffect(() => {

        if (localStorage.getItem('uid')) {
            if (pid.toLowerCase().slice(0, -5).split('').reverse().join('') === localStorage.getItem('uid').toLowerCase()) {
                // window.location = "https://signal-hub.vercel.app/profile"
                router.push('/profile')
            }
        }


    }, []);

    const [isScrolled, setIsScrolled] = useState(1);


    const getUser = () => {
        var myHeaders = new Headers();


        var raw = JSON.stringify({
            "uid": pid
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://signal-hub.vercel.app/api/get-user", requestOptions)
            .then(response => response.text())
            .then(result => {
                setUser(JSON.parse(result))

            })
            .catch(error => console.log('error', error));

    };

    useEffect(() => {
        getUser()
    }, [])

    gsap.registerPlugin(ScrollToPlugin); // Register the plugin

    function handleGetRoute(params) {
        setIsCurrentprofileRoute(params);
    }
    const [allSignals, setAllSignals] = useState([])
    const [Signals, setSignals] = useState([])
    const [cryptoSignals, setCryptoSignals] = useState([])
    const [forexSignals, setForexSignals] = useState([])
    const getAllSignals = () => {
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "uid": user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://signal-hub.vercel.app/api/all-user-signals", requestOptions)
            .then(response => response.text())
            .then(result => {
                let allSignals = JSON.parse(result).goodSignals.concat(JSON.parse(result).badSignals, JSON.parse(result).neutralSignals);

                setAllSignals(allSignals)
                setSignals(JSON.parse(result))


            })
            .catch(error => console.log('error', error));

    };
    useEffect(() => {
        user && getAllSignals()
    }, [user])
    useEffect(() => {
        const cryptoSignals = allSignals.filter((signal) => signal.cryptoOrStock === 'Crypto');
        const stockSignals = allSignals.filter((signal) => signal.cryptoOrStock === 'Stock');
        setCryptoSignals(cryptoSignals)
        setForexSignals(stockSignals)
    }, [allSignals])

    const handleScroll = (direction) => {
        const scrollContainer = document.getElementById('scroll-container');

        if (scrollContainer) {
            if (direction === 'left' && isScrolled <= 2) {
                gsap.to(scrollContainer, { x: '-=100', duration: 0.3 }); // Adjust the scroll distance and duration as needed
                setIsScrolled(isScrolled + 1)

            } else if (direction === 'right' && isScrolled >= 2) {
                gsap.to(scrollContainer, { x: '+=100', duration: 0.3 }); // Adjust the scroll distance and duration as needed
                setIsScrolled(isScrolled - 1)

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


    return (
        <div className='w-full'>
            <MyContextProvider>
                <RouterLoading />
                <Modal />

                <Navbar />

                <div className='flex'>
                    <Sidebar />
                    {user ?
                        <div class="h-full bg-gray-200 md:p-8 p-4 w-full">

                            <div class="bg-white rounded-lg shadow-xl p-6 flex flex-col lg:flex-row  xl:flex-row items-center">
                                <div x-data="{ openSettings: false }" class="absolute right-12 mt-4 rounded">
                                </div>
                                <img
                                    src={user.profilePicture}
                                    className="w-40 h-40 rounded-full mx-4 border-2 border-gray-500  transition duration-300 object-cover"
                                    alt={user.displayName}
                                />

                                <div>
                                    <div class="flex items-center space-x-2 lg:justify-start justify-center mt-2">
                                        <p class="text-2xl">{user.displayName}</p>
                                        <span class="bg-blue-500 rounded-full p-1" title="Verified">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <p class="text-gray-700">{user.bio}</p>
                                    <p class="text-sm text-gray-500">Joined at {user.registrationDate}</p>
                                    <p class="text-sm text-gray-500 mt-3">Subscribers {user.Subscribers.length}</p>
                                </div>
                                <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8">
                                    <ShareModal
                                        isOpen={isShareModalOpen}
                                        onRequestClose={closeModal}
                                        id={user.fireBaseUid}
                                        title={user.displayName}
                                        isSignal={false}
                                        url={window.location.host + '/signal-provider/' + user.fireBaseUid}

                                    />
                                    <div
                                        className=" text-gray-600 cursor-pointer  hidden md:block rounded-md hover:text-gray-800 focus:outline-none"
                                        onClick={openModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                                        </svg>
                                    </div>

                                    {user && (pid.toLowerCase() !== localStorage.getItem('uid')?.toLowerCase() ? <Subscribe setIsCurrentprofileRoute={handleGetRoute} targetUser={user} /> : <EditButtons openModal={openModal} />)}
                                    <div
                                        className=" text-gray-600 cursor-pointer mt-3 mtinsm  block md:hidden rounded-md hover:text-gray-800 focus:outline-none"
                                        onClick={openModal}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>


                            <Career user={user} />
                            <PersonalInfo user={user} />

                            <div>
                                <div class="w-full flex flex-col  mt-3 cursor-pointer">
                                    <div class="bg-white ">
                                        <div className="relative overflow-hidden flex flex-row items-center sm:flex-col sm:items-stretch ">

                                            <ul className="flex scroll-controller lg:flex-row lg:justify-around xl:flex xl:justify-around  justify-start" id="scroll-container">

                                                <li onClick={() => handleGetRoute('All')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'All' ? 'bg-gray-100' : ''}`}>
                                                    All
                                                </li>
                                                <li onClick={() => handleGetRoute('Active')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Active' ? 'bg-gray-100' : ''}`}>
                                                    Active
                                                </li>
                                                <li onClick={() => handleGetRoute('Good')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Good' ? 'bg-gray-100' : ''}`}>
                                                    Good
                                                </li>
                                                <li onClick={() => handleGetRoute('Neutral')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Neutral' ? 'bg-gray-100' : ''}`}>
                                                    Neutral
                                                </li>
                                                <li onClick={() => handleGetRoute('Bad')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Bad' ? 'bg-gray-100' : ''}`}>
                                                    Bad
                                                </li>
                                                <li onClick={() => handleGetRoute('Crypto')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Crypto' ? 'bg-gray-100' : ''}`}>
                                                    Crypto
                                                </li>
                                                <li onClick={() => handleGetRoute('Forex')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Forex' ? 'bg-gray-100' : ''}`}>
                                                    Forex
                                                </li>
                                                <li onClick={() => handleGetRoute('About')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'About' ? 'bg-gray-100' : ''}`}>
                                                    About
                                                </li>
                                                <li onClick={() => handleGetRoute('Reviews')} class={`scroll-item text-gray-500 hover:bg-gray-100 p-3 w-full justify-center flex ${currentprofileRoute === 'Reviews' ? 'bg-gray-100' : ''}`}>
                                                    Reviews
                                                </li> </ul>
                                            {isScrolled <= 2 && (
                                                <div className="absolute right-0 cursor-pointer sm:hidden" onClick={() => handleScroll('left')}>
                                                    &#9654;
                                                </div>
                                            )}
                                            {isScrolled >= 2 && (
                                                <div className="absolute right-4 cursor-pointer sm:hidden" onClick={() => handleScroll('right')}>
                                                    &#9664;
                                                </div>
                                            )}
                                            {/* Your content here */}



                                        </div>



                                    </div>


                                </div>
                            </div>


                            {currentprofileRoute === 'All' && <ProfileSignalCards signals={allSignals} />}
                            {currentprofileRoute === 'Good' && <ProfileSignalCards signals={Signals.goodSignals} />}
                            {currentprofileRoute === 'Active' && <ProfileSignalCards signals={Signals.activeSignals} />}
                            {currentprofileRoute === 'Neutral' && <ProfileSignalCards signals={Signals.neutralSignals} />}
                            {currentprofileRoute === 'Bad' && <ProfileSignalCards signals={Signals.badSignals} />}
                            {currentprofileRoute === 'Crypto' && <ProfileSignalCards signals={cryptoSignals} />}
                            {currentprofileRoute === 'Forex' && <ProfileSignalCards signals={forexSignals} />}
                            {currentprofileRoute === 'Reviews' && <Reviews provider={user} />}
                            {currentprofileRoute === 'About' && <About />}
                            <SignalModal />
                            <Modal />

                          

                        </div> : <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="text-white mt-4">Loading...</p>
                        </div>
                    }</div>

                <SignalModal />
                <BottomNavbar />

            </MyContextProvider>


        </div>
    );
}

export default User;