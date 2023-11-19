import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';

const Subscribe = ({ targetUser, openModal,ShareIcon }) => {

    const [subscribed, setSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { user, isModalOpen, setIsModalOpen } = useMyContext()



    async function handleSubscription(action) {
        setIsLoading(true)
        try {
            const apiUrl = 'https://signal-hub.vercel.app/api/subscribe'; // Adjust the URL to match your API route

            // Create a request object with the appropriate method, headers, and body
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id,
                    userFcm: user.notificationPreferences.fcmToken,
                    targetUserId: targetUser._id,
                    action: action, // 'subscribe' or 'unsubscribe'
                }),
            };

            // Send the request to your API
            const response = await fetch(apiUrl, request);

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Log the success message
                if (data.message === 'Subscription subscribed successfully') {
                    setSubscribed(true)
                }
                else if (data.message === 'Subscription unsubscribed successfully') {
                    setSubscribed(false)
                }
                setIsLoading(false)

                // You can update your UI or take other actions as needed
            } else {
                const errorData = await response.json();
                console.error(errorData.error); // Log the error message
                // Handle the error in your application, e.g., show a notification to the user
            }
        } catch (error) {

            console.error('Errorz subscribing:', error);
            // Handle any unexpected errors, e.g., network issues
        }
    }

    useEffect(() => {

        // setSubscribers(targetUser.Subscribers)

        if (targetUser.Subscribers) {
            if (targetUser.Subscribers.includes(user._id)) {
                setSubscribed(true);
                console.log('User is in subscribers array.');
            } else
                setSubscribed(false);

        }


    }, [targetUser, user._id])


    // Example usage:


    return (
        <div>

            <div class="flex items-center  col-buttons  lg:mt-24 xl:mt-24 mt-3">
                {!subscribed ? <button onClick={() => {
                    if (window.localStorage.getItem('uid')) {
                        handleSubscription('subscribe')

                    }
                    else setIsModalOpen(true)
                }} class="flex items-center bg-gray-600 w-full hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                    </svg>
                    <span>
                        {isLoading ? (
                            <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                        ) : (
                            'Subscribe'
                        )}
                    </span>
                </button> :
                    <button onClick={() => handleSubscription('unsubscribe')} class="flex items-center w-full bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <span>    {isLoading ? (
                            <div className="w-5 h-5 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
                        ) : (
                            'Unsubscribe'
                        )}</span>
                    </button>}

                <button class="flex items-center col_button bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                    </svg>
                    <button class="whitespace-nowrap">Write a Review</button>
                </button>
                <ShareIcon/>

            </div>

        </div>
    );
}


export default Subscribe;
