'use client'

import React, { useEffect, useState } from 'react'
import SubscribedCard from "./SubscriptionsCard.js"
import { MyContextProvider, useMyContext } from '../context/context.js';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Subscription() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const { user, setRouterLoading, isModalOpen, setIsModalOpen, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a POST request using the fetch API
                const response = await fetch('/api/getSubscriptions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ subscriberId: user._id }),
                });

                // Check if the response is successful (status code 2xx)
                if (response.ok) {
                    const data = await response.json();
                    setSubscriptions(data);

                    setTimeout(() => {
                        setDataLoading(false);
                    }, 2000);
                    console.log(data);
                } else {
                    console.error('Failed to fetch subscribed data');
                }
            } catch (error) {
                console.error('Error fetching subscribed data:', error);
            }
        };

        // Check if the user is available before making the request
        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <MyContextProvider>
            <div className='webkit-fill-available h-full'>
                {!dataLoading ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-0 md:p-2">
                        {subscriptions.map((subscription) => (
                            <SubscribedCard subscribed={subscription} key={subscription._id} />
                        ))}
                    </div>
                ) : (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="text-white mt-4">Loading...</p>
                    </div>
                )}

                {subscriptions.length === 0 && !dataLoading && (
                    <div className='webkit-fill-available h-full flex justify-center items-center mt-44 text-gray-800'>
                        <div className="flex flex-col items-center">
                            <FontAwesomeIcon icon={faInfoCircle} className="text-4xl mb-2" />
                            <p className="text-lg font-semibold">No Subscriptions</p>
                            <p className="text-sm">Explore and subscribe providers to get signals.</p>
                        </div>
                    </div>
                )}
            </div>
        </MyContextProvider>
    );
}

export default Subscription;
