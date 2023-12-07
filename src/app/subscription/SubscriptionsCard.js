// subscribedCard.js

import React from 'react';

const subscribedCard = ({ subscribed }) => {
    console.log(subscribed);
    return (
<div class="w-full rounded-none lg:roujnded-xl p-6  shadow-md shadow-indigo-300 min-w-fit max-w-full  bg-white">
<div className="flex flex-col justify-center items-center">
      <div class="grid-cols-1 lg:col-span-3">
        
        <img className='object-cover mx-auto  rounded-full flex h-[90px] w-[90px] items-center justify-center  bg-gray-100 '  src={subscribed.profilePicture} alt={subscribed.displayName}/>
      </div>

      <div class="col-span-1 lg:col-span-9">
        <div class="text-center ">
          <h2 class="text-2xl mt-4 font-bold text-zinc-700">{subscribed.displayName}</h2>
          <p class="mt-2 font-semibold text-zinc-700">{subscribed.email}</p>
          <p class="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-6 text-center ">
          <div>
            <p class="font-bold text-zinc-700">345</p>
            <p class="text-sm font-semibold text-zinc-700">Total Signals</p>
          </div>

          <div>
            <p class="font-bold text-zinc-700">200k</p>
            <p class="text-sm font-semibold text-zinc-700">Subscribers</p>
          </div>

          <div>
            <p class="font-bold text-zinc-700">38</p>
            <p class="text-sm font-semibold text-zinc-700">Reviews</p>
          </div>
          <div>
            <p class="font-bold text-zinc-700">345</p>
            <p class="text-sm font-semibold text-zinc-700">Good Signals</p>
          </div>

          <div>
            <p class="font-bold text-zinc-700">200k</p>
            <p class="text-sm font-semibold text-zinc-700">Neutran Signals</p>
          </div>

          <div>
            <p class="font-bold text-zinc-700">38</p>
            <p class="text-sm font-semibold text-zinc-700">Bad Signals</p>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4">
          <button class="w-full rounded-xl border-2 border-gray-500 bg-white px-3 py-2 font-semibold text-gray-500 hover:bg-gray-500 hover:text-white">Follow</button>

          <button class="w-full rounded-xl border-2 border-gray-500 bg-white px-3 py-2 font-semibold text-gray-500 hover:bg-gray-500 hover:text-white">Profile</button>
        </div>
      </div>
    </div>
  </div>


    );
};

export default subscribedCard;
