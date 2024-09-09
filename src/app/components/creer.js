'use client'
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faBell, faCheck, faClose, faLineChart, faSignal, faSignal5, faSignalPerfect, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignalsPieChart from './career-chart'
import React, { useEffect, useState } from 'react';
import GoodSignals from './good';
import BadSignals from './bad';
import { useMyContext } from '../context/context';

const Creer = ({ user }) => {

    const [allCount, setAllCount] = useState(null);
    const [goodCount, setGoodCount] = useState(null);
    const [badCount, setBadCount] = useState(null);
    const [neutralCount, setNeutralCount] = useState(null);
    const [activeCount, setActiveCount] = useState(null);
    const { fetchCounts, getCounts } = useMyContext()
    var reviewsCount = user.reviews && user.reviews.length || 0


    useEffect(() => {

        getCounts(setAllCount, setGoodCount, setNeutralCount, setBadCount, setActiveCount, user._id)
    }, []);

    function TotalSignal({ count }) {


        return <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
            <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-indigo-600">Total Signals</span>
                <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
            </div>
            <div class="flex items-center justify-between mt-6">
                <div class="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>


                        {/* <path d="M12 4a2 2 0 100 4 2 2 0 000-4zM19.59 12l-6.3-6.3a2 2 0 00-2.83 0l-6.3 6.3a2 2 0 000 2.83l6.3 6.3a2 2 0 002.83 0l6.3-6.3a2 2 0 000-2.83z" /> */}
                    </svg>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-end">
                        <span class="text-2xl 2xl:text-3xl font-bold">{count === null ? < div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-indigo-600"></div> : count}</span>


                    </div>
                </div>
            </div>
        </div>
    }

    function GoodSignal({ count }) {

        return <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
            <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-green-600">Good Signals</span>
                <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
            </div>
            <div class="flex items-center justify-between mt-6">
                <div>
                    <svg class="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <FontAwesomeIcon icon={faCheck} />
                    </svg>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-end">
                        <span class="text-2xl 2xl:text-3xl font-bold">{count === null ? < div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-green-600"></div> : count}</span>


                    </div>
                </div>
            </div>
        </div>
    }

    function NeutralSignal({ count }) {


        return <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
            <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-blue-600">Neutral Signals</span>
                <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
            </div>
            <div class="flex items-center justify-between mt-6">
                <div>
                    <svg class="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-end">
                        <span class="text-2xl 2xl:text-3xl font-bold">
                            {count === null ? < div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-blue-600"></div> : count}                        </span>
                    </div>
                </div>
            </div>
        </div>
    }
    function BadSignal({ count }) {


        return <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
            <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-red-600">Bad Signals</span>
                <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
            </div>
            <div class="flex items-center justify-between mt-6">
                <div>
                    <svg class="w-12 h-12 p-2.5 bg-red-400 bg-opacity-20 rounded-full text-red-600 border border-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <FontAwesomeIcon icon={faClose} />
                    </svg>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-end">
                        <span class="text-2xl 2xl:text-3xl font-bold">
                            {count === null ? < div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-red-600"></div> : count}
                        </span>
                    </div>
                </div>
            </div>
        </div >
    }

    function ActiveSignal({ count }) {


        return <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
            <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-green-600">Active Signals</span>
                <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
            </div>
            <div class="flex items-center justify-between mt-6">
                <div>
                    <svg class="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <div class="flex items-end">
                        <span class="text-2xl 2xl:text-3xl font-bold">
                            {count === null ? < div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-green-600"></div> : count}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div>

            {user && <div class="flex-1 w-full bg-white rounded-lg lg:shadow-xl shadow-md mt-4 lg:p-8 p-4">
                <h4 class="text-xl text-gray-900 font-bold">Performance</h4>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8  mt-4">
                    <TotalSignal count={allCount} />
                    <GoodSignal count={goodCount} />
                    <NeutralSignal count={neutralCount} />
                    <BadSignal count={badCount} />
                    <ActiveSignal count={activeCount} />
                    {/* <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-sm text-slate-600">Subscriber</span>
                            <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
                        </div>
                        <div class="flex items-center justify-between mt-6">
                            <div>
                                <svg class="w-12 h-12 p-2.5 bg-slate-400 bg-opacity-20 rounded-full text-slate-600 border border-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <FontAwesomeIcon icon={faUsers} />
                                </svg>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-end">
                                    <span class="text-2xl 2xl:text-3xl font-bold">23.32k </span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md">
                        <div class="flex items-center justify-between">
                            <span class="font-bold text-sm text-slate-600">Reviews</span>
                            <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
                        </div>
                        <div class="flex items-center justify-between mt-6">
                            <div>
                                <svg class="w-12 h-12 p-2.5 bg-slate-400 bg-opacity-20 rounded-full text-slate-600 border border-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                    </svg>
                                </svg>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-end">
                                    <span class="text-2xl 2xl:text-3xl font-bold">{reviewsCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>

                {(goodCount + badCount + neutralCount > 0) &&
                    <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 mt-4">


                        <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg lg:shadow-xl shadow-md flex justify-center">
                            <div>

                                <SignalsPieChart goodCount={goodCount} badCount={badCount} neutralCount={neutralCount} />

                            </div>
                        </div>
                    </div>
                }


                {/* <div class="mt-4">
                                <canvas id="verticalBarChart" className='block box-border h-414 w-828' width="1656" height="828"></canvas>
                            </div> */}
            </div >}
        </div >
    );
}

export default Creer;
