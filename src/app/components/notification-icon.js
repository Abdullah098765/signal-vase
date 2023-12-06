import { useState } from 'react';
import Head from 'next/head';
import NotificationCardList from "@/app/notifications/notification-list"

const Notification_Icon = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <Head>
                {/* <script
          src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
          defer
        ></script> */}
            </Head>

            <div className="">
                <div className="">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="relative z-10 block rounded-md bg--gray-800  p-2 focus:outline-none"
                    >
                        <svg
                            className="h-5 w-5 text-white "
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div
                            onClick={() => setDropdownOpen(false)}
                            className="fixed inset-0 h-full w-full z-10"
                        ></div>
                    )}

                    {dropdownOpen && (
                         <div
                         className="absolute right-0  bg-white rounded-md shadow-lg overflow-hidden z-20 flex flex-col justify-between items-stretch"
                         style={{ width: '42rem', maxHeight: '30rem', minHeight: '30rem' }}
                       >
                         {/* Notifications list */}
                         <NotificationCardList />
         
                         {/* Button fixed at the bottom */}
                         <button
                           href="#"
                           className="block bg-gray-800 text-white text-center font-bold py-2"
                         >
                           See all notifications
                         </button>
                       </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notification_Icon;
