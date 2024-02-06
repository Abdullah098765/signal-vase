import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../context/context';
import SkeletonSmallCard from './SkeletonSmallCard.js';

export default function ProfileSignalCards({ currentprofileRoute, user_id, isOnlyCount }) {
    const { setRouterLoading } = useMyContext();
    const router = useRouter()
    const [isMoreSignalsLoading, setIsMoreSignalsLoading] = useState(true);

    const [signals, setSignals] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsMoreSignalsLoading(true)

        const fetchData = async () => {

            try {
                // Replace 'yourId' with the actual value of _id

                const response = await fetch('/api/get-profile-signal-data', {
                    method: 'POST',
                    body: JSON.stringify({
                        currentprofileRoute,
                        _id: user_id,
                        page: page,
                        isOnlyCount
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (!signals) {
                        setSignals([])
                    }
                    if (Array.isArray(data)) {
                        setSignals(prevSignals => {
                            // Concatenate the new data to the existing signals array
                            const updatedSignals = [...prevSignals, ...data];

                            // Use a set to efficiently remove duplicates based on a specific condition
                            const uniqueSignals = Array.from(new Set(updatedSignals.map(signal => signal._id)))
                                .map(_id => updatedSignals.find(signal => signal._id === _id));

                            return uniqueSignals;
                        });
                    } else {
                        console.error('Invalid data format:', data);
                        // Handle the case where the data is not an array, log an error, or take appropriate action.
                    }
                    console.log(data);
                    setIsMoreSignalsLoading(false)

                } else {
                    console.error('Error fetching data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, currentprofileRoute]);

    const containerRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;

            if (container) {
                const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;

                if (isAtBottom) {
                    console.log('Scrolled to the bottom!');
                    setPage((prevPage) => prevPage + 1)
                }
            }
        };

        const container = containerRef.current;

        if (container) {
            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);
    useEffect(() => {
        setSignals([])
        setPage(1)
    }, [currentprofileRoute]);
    if (currentprofileRoute === "About" || currentprofileRoute === "Reviews") {
        return <div ref={containerRef} style={{ overflowY: 'auto' }} className='flex-1 bg-white shadow-md lg:shadow-xl '></div>;
      }
      
    return (
        <div ref={containerRef} style={{ height: '1000px', overflowY: 'auto' }} className='flex-1 bg-white shadow-md lg:shadow-xl lg:p-8 p-0 '>
            {signals?.length === 0 && !isMoreSignalsLoading ? (
                <p className="text-center pt-20 pb-32 text-gray-500">No signals available.</p>
            ) : <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 ">

                {signals[0]?._id && signals.map((signal, index) => (
                    <div key={index}>

                        <div className="bg-white p-3 card  " key={signal._id}>
                            <div className='flex justify-between'>
                                {/* Signal Type Badge */}
                                <div className={`mb-2 ${signal.longOrShort === 'Long' ? 'bg-green-500' : 'bg-red-500'} text-white py-1 px-2 rounded-md text-xs font-semibold inline-block`}>
                                    {signal.longOrShort === 'Long' ? "Buy" : "Sell"}
                                </div>
                                {/* Timestamp */}
                                <div className="text-gray-600 text-xs">
                                    {formatDistanceToNow(new Date(signal.createdAt), { addSuffix: true })}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                {/* Trading Pair and Signal Strength */}
                                <div>
                                    <p className="text-sm font-semibold">{signal.pair}</p>
                                    <p className={`text-sm ${signal.duration >= new Date().getTime() ? 'text-green-500' : 'text-red-500'}`}>
                                        {signal.duration >= new Date().getTime() ? 'Active Signal' : 'Expired'}
                                    </p>
                                </div>


                            </div>

                            {/* Description */}
                            <p className="mt-2 text-sm overflow-ellipsis truncate">{signal.explanation}</p>

                            <hr className="my-2 border-gray-300" />

                            {/* Key Metrics */}
                            <div className="grid grid-cols-2 gap-1 text-sm">
                                <div>
                                    <p className="text-gray-600">Entry Price 1</p>
                                    <p>{signal.entry1}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Entry Price 2</p>
                                    <p>{signal.entry2}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Stop-Loss</p>
                                    <p>{signal.stopLoss}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Take-Profit 1</p>
                                    <p>{signal.takeProfit1}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Take-Profit 2</p>
                                    <p>{signal.takeProfit2}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Take-Profit 3</p>
                                    <p>{signal.takeProfit3}</p>
                                </div>
                            </div>




                            {/* User Comments and Ratings */}
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Comments: {signal.comments.length}</p>
                                <p>Followers: {signal.followers.length}</p>
                            </div>




                            {/* Action Buttons */}
                            <div className="mt-2 flex justify-end space-x-2">


                                {!true ? <button onClick={() => {

                                    setRouterLoading(true)
                                    router.push('/signal/' + signal._id)

                                }} className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm">
                                    Follow Signal
                                </button>
                                    :
                                    <button onClick={() => {
                                        setRouterLoading(true)
                                        router.push('/signal/' + signal._id)

                                        // router,
                                    }} className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 text-sm">
                                        See Details
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
                {isMoreSignalsLoading && <><SkeletonSmallCard /></>}

            </div>}
        </div>
    )
}
