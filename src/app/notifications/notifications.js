import React from 'react'
import NotificationCardList from  './notification-list'
export default function Notifications() {
    return (
        <div className='w-full'>
            <div class="h-full bg-gray-200 md:p-8 p-4 ">
                <div class="bg-white rounded-lg shadow-xl md:p-8 p-4 flex flex-col lg:flex-row  xl:flex-row items-center">

                    <NotificationCardList/>

                </div>
            </div>
        </div>
    )
}
