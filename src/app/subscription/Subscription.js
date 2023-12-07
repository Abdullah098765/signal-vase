'use client'

import React, { useEffect, useState } from 'react'
import SubscriptionCard from "./SubscriptionsCard.js"
import { useMyContext } from '../context/context.js';


function Subscription() {

    const [Subscriptions, setSubscriptions] = useState()

    const { user, setRouterLoading, isModalOpen, setIsModalOpen, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a POST request using the fetch API
                const response = await fetch('/api/getSubscribedData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: user._id }),
                });

                // Check if the response is successful (status code 2xx)
                if (response.ok) {
                    const data = await response.json();
                    setSubscribedData(data);
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
        <div className='webkit-fill-available h-full'>
            <div className='webkit-fill-available h-full'>
                {user ?
                    <div className="flex-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-1 p-0 md:p-2">
                    
                        {/* {Subscriptions.map((subscribed) => ( */}
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                        <SubscriptionCard subscribed={user} key={user._id} />
                    

                        {/* ))} */}
                    </div> : <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="text-white mt-4">Loading...</p>
                    </div>

                }
            </div>        </div>
    )
}

export default Subscription
