"use client"
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';
import { formatDistanceToNow } from 'date-fns';

const NotificationCardList = () => {

  const { user, setRouterLoading, isModalOpen, setIsModalOpen, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  // Assuming you are calling this function in a React component or another client-side context
  async function getNotifications() {
    try {
      const response = await fetch('https://signal-hub.vercel.app/api/get-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNotifications(data)
      console.log(data);
      setIsNotificationsLoading(false)
      // Process the retrieved data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getNotifications()
  }, [user])

  // Example usage

  return (
    <div class="p-2   border border-b-0 pb-0  w-full">

      {!isNotificationsLoading ? <>{notifications && notifications.map((notification, index) =>
        <a key={index} href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
          <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=398&q=80" alt="avatar" />
          <p class="text-gray-600 text-sm mx-2">
            <span class="font-bold" href="#">{notification.title}</span> {notification.body}
            {' ' + formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </a>)}

      </> : <div className=" inset-0 flex items-center justify-center bg-white opacity-75">
        <div className="animate-spin rounded-full border-t-4 mt-40 border-gray-500 border-solid h-12 w-12"></div>
      </div>}
    </div>
  );
};

export default NotificationCardList;
