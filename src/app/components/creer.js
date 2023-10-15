import { faBell, faCheck, faClose, faLineChart, faSignal, faSignal5, faSignalPerfect, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Creer = () => {
    return (
        <div>
              <div class="flex-1 w-full bg-white rounded-lg shadow-xl mt-4 p-8">
                    <h4 class="text-xl text-gray-900 font-bold">Careere</h4>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                        <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-indigo-600">Total Signals</span>
                                <span class="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
                            </div>
                            <div class="flex items-center justify-between mt-6">
                                <div>
                                    <svg class="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <FontAwesomeIcon icon={faLineChart} />
                                        {/* <path d="M12 4a2 2 0 100 4 2 2 0 000-4zM19.59 12l-6.3-6.3a2 2 0 00-2.83 0l-6.3 6.3a2 2 0 000 2.83l6.3 6.3a2 2 0 002.83 0l6.3-6.3a2 2 0 000-2.83z" /> */}
                                    </svg>
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex items-end">
                                        <span class="text-2xl 2xl:text-3xl font-bold">1.8k</span>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
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
                                        <span class="text-2xl 2xl:text-3xl font-bold">1.53k</span>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
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
                                        <span class="text-2xl 2xl:text-3xl font-bold">242</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-sm text-green-600">Active Signals</span>
                                <span class="text-xs bg-green-200 hover:bg-green-500 text-green-500 hover:text-green-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">Lifetime</span>
                            </div>
                            <div class="flex items-center justify-between mt-6">
                                <div>
                                    <svg class="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <FontAwesomeIcon icon={faSignalPerfect} />
                                    </svg>
                                </div>
                                <div class="flex flex-col">
                                    <div class="flex items-end">
                                        <span class="text-2xl 2xl:text-3xl font-bold">242</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
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
                                        <span class="text-2xl 2xl:text-3xl font-bold">23.32k</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div class="mt-4">
                                <canvas id="verticalBarChart" className='block box-border h-414 w-828' width="1656" height="828"></canvas>
                            </div> */}
                </div>
        </div>
    );
}

export default Creer;
