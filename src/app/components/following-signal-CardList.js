"use client"
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';
import CountdownClock from './countDown.js'
import GoodBadButtons from './good-bad-buttons.js'
import "./components.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';


const SignalCardList = () => {
    const [followedSignals, setFollowedSignals] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const { user, closeSidenav, setRouterLoading, lineClicked, setSelectedSignal, setisSignalModalOpen, _setIsModalOpen } = useMyContext()

    var windowWidth;

    useEffect(() => {
        windowWidth = window.innerWidth;
    })
    useEffect(() => {
        setRouterLoading(false)
        console.log("Browser window width: " + windowWidth + " pixels");
        if (!lineClicked) {
            if (windowWidth <= 1100) {
                closeSidenav(false)
            }

        }
        if (windowWidth >= 1100) {
            closeSidenav(true)
        }

    }, [windowWidth])

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            'userId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://signal-hub.vercel.app/api/followed-signals", requestOptions)
            .then(response => response.text())
            .then(result => {
                setFollowedSignals(JSON.parse(result))
                setDataLoading(false)
                // console.log(JSON.parse(result));
            }
            )
            .catch(error => console.log('error', error));


    },);
    return (
        <div className='flex flex-col justify-center items-center px-3 py-3 sm:px-6 md:px-8 lg:px-10 xl:px-12  webkit-fill-available'>
            <h1 class="text-3xl font-bold mt-6 mb-4 text-gray-800 border-b">{followedSignals.length} Signals Following</h1>

            {followedSignals.map((signal) => (
                <div
                    key={signal._id}
                    className="bg-white  dark:bg-black border border-gray-900 dark:border-white shadow-lg rounded-lg p-4 4  my-4 flex flex-col md:flex-row items-center justify-between  webkit-fill-available "
                >
                    <div
                        className={`${signal.longOrShort === 'Long' ? 'bg-green-500' : 'bg-red-500'
                            } text-white py-1 px-2 rounded-md text-sm font-semibold inline-block mb-2 md:mb-0 xl:mr-2`}
                    >
                        {signal.longOrShort === 'Long' ? 'Buy' : 'Sell'}
                    </div>
                    <h1 className="text-2xl text-gray-800 font-bold xl:mr-3">
                        {signal.pair}
                    </h1>
                    <p className="text-sm text-gray-500 mr-2 ml-2 ">
                        Entry: {signal.entry1} | SL: {signal.stopLoss} | TP: {signal.takeProfit1}
                    </p>

                    <div className='flex flex-col md:flex-row justify-between items-center xl:mr-3'>
                        <img
                            src={signal.signalProvider.profilePicture}
                            alt={signal.signalProvider.displayName}
                            className="w-6 h-6 rounded-full object-cover mb-2 md:mb-0 mr-3 "
                        />

                        {/* Signal Information */}
                        {/* Signal Provider's Display Name */}
                        <h2 className="text-sm font-semibold xl:mr-3">
                            {signal.signalProvider.displayName}
                        </h2>
                    </div>

                    {/* Pair and Entry Price */}

                    {/* Duration */}
                    {signal.duration >= new Date().getTime() ? <p className="text-sm text-gray-500 xl:mr-5">
                        <CountdownClock duration={signal.duration} />
                    </p> :
                        <GoodBadButtons signal={signal} />


                    }

                    {/* Signal Type Badge (Buy or Sell) */}

                    {/* Action Buttons */}
                    <div className="mt-4 sm:mt-0">
                        <button onClick={() => {
                            // _setIsModalOpen(true, signal)
                            setSelectedSignal(signal)
                            setisSignalModalOpen(true)
                        }} className="bg-gray-700 text-white px-4 py-2 sm:mt-2 lg:mt-0 lg:ml-1 rounded-full hover:bg-gray-900 text-sm">
                            See Details
                        </button>

                    </div>
                </div>
            ))}
            {(dataLoading && user)  && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-white ml-2 mt-4" >Loading...</p>
            </div>}
        </div>



    );
}

export default SignalCardList;

