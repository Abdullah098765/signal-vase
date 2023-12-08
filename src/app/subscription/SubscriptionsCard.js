// subscribedCard.js

import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';
import { useRouter } from 'next/navigation';

const SubscribedCard = ({ subscribed }) => {
  const { user, setRouterLoading, isModalOpen, setIsModalOpen, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();

  const [iAmSubscriber, setIAmSubscriber] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubscription(action) {
    setIsLoading(true)
    try {
      const apiUrl = '/api/subscribe'; // Adjust the URL to match your API route

      // Create a request object with the appropriate method, headers, and body
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          userFcm: user.notificationPreferences.fcmToken,
          targetUserId: subscribed._id,
          action: action, // 'subscribe' or 'unsubscribe'
        }),
      };

      // Send the request to your API
      const response = await fetch(apiUrl, request);

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log the success message
        if (data.message === 'Subscription subscribed successfully') {
          setIAmSubscriber(true)
        }
        else if (data.message === 'Subscription unsubscribed successfully') {
          setIAmSubscriber(false)
          console.log('Subscription unsubscribed successfully');
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
  const router = useRouter()

  useEffect(() => {

    // setSubscribers(subscribed.Subscribers)

    if (subscribed.Subscribers) {
      if (subscribed.Subscribers.includes(user._id)) {
        setIAmSubscriber(true);
        console.log('User is in subscribers array.');
      } else
        setIAmSubscriber(false);

    }

  }, [subscribed, user])

  console.log(subscribed);
  return (
    <div class="w-full rounded-none lg:roujnded-xl p-6  shadow-md shadow-indigo-300 min-w-fit max-w-full  bg-white">
      <div className="flex flex-col justify-center items-center">
        <div class="grid-cols-1 lg:col-span-3">

          <img className='object-cover mx-auto  rounded-full flex h-[90px] w-[90px] items-center justify-center  bg-gray-100 ' src={subscribed.profilePicture} alt={subscribed.displayName} />
        </div>

        <div class="col-span-1 lg:col-span-9">
          <div class="text-center ">
            <h2 class="text-2xl mt-4 font-bold text-zinc-700">{subscribed.displayName}</h2>
            <p class="mt-4 text-zinc-500">{subscribed.bio}</p>
          </div>

          {subscribed.Subscribers.length && <div class="mt-6 grid grid-cols-3 gap-6 text-center ">
            <div>
              <p class="font-bold text-zinc-700">{subscribed.goodSignals.length + subscribed.badSignals.length + subscribed.neutralSignals.length}</p>
              <p class="text-sm font-semibold text-zinc-700">Total Signals</p>
            </div>

            <div>
              <p class="font-bold text-zinc-700">{subscribed.Subscribers.length}</p>
              <p class="text-sm font-semibold text-zinc-700">Subscribers</p>
            </div>

            <div>
              <p class="font-bold text-zinc-700">{subscribed.reviews.length}</p>
              <p class="text-sm font-semibold text-zinc-700">Reviews</p>
            </div>
            <div>
              <p class="font-bold text-zinc-700">{subscribed.goodSignals.length}</p>
              <p class="text-sm font-semibold text-zinc-700">Good Signals</p>
            </div>

            <div>
              <p class="font-bold text-zinc-700">{subscribed.neutralSignals.length}</p>
              <p class="text-sm font-semibold text-zinc-700">Neutran Signals</p>
            </div>

            <div>
              <p class="font-bold text-zinc-700">{subscribed.badSignals.length}</p>
              <p class="text-sm font-semibold text-zinc-700">Bad Signals</p>
            </div>
          </div>}

          <div class="mt-6 grid grid-cols-2 gap-4">
            {/* <button class="w-full rounded-xl border-2 border-gray-500 bg-white px-3 py-2 font-semibold text-gray-500 hover:bg-gray-500 hover:text-white">Unsubscribe</button> */}
            {!iAmSubscriber ? <button onClick={() => {
              if (window.localStorage.getItem('uid')) {
                handleSubscription('subscribe')

              }
              else setIsModalOpen(true)
            }}
              class="w-full rounded-xl items-center justify-center align-middle flex    font-semibold text-gray-700 hover:text-gray-900">
              <span>
                {isLoading ? (
                  <div className="w-5 h-5 border-t-2 border-gray-500 border-solid rounded-full animate-spin"></div>
                ) : (
                  'Subscribe'
                )}
              </span>
            </button> :
              <button onClick={() => {
                handleSubscription('unsubscribe')
              }
              } class="w-full rounded-xl items-center justify-center align-middle flex     font-semibold text-red-700 hover:text-red-900">
                <span>    {isLoading ? (
                  <div className="w-5 h-5 border-t-2  border-red-500 border-solid rounded-full animate-spin"></div>
                ) : (
                  'Unsubscribe'
                )}</span>
              </button>}

            <button onClick={() => {
              setRouterLoading(true)
              router.push("/signal-provider/" + subscribed.fIdHash)
            }} class="w-full rounded-xl  bg-white px-3 py-2 font-semibold text-gray-500  hover:text-gray-900">Profile</button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default SubscribedCard;
