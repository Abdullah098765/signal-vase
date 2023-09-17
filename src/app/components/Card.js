import React from 'react'
import Image from 'next/image'
import './components.css'
export default function Card({ signal }) {
    return (
        <div className="bg-white  p-3 card">
            {/* Signal Type Badge */}
            <div className={`mb-2 ${signal.type === 'Buy' ? 'bg-green-500' : 'bg-red-500'} text-white py-1 px-2 rounded-md text-xs font-semibold inline-block`}>
                {signal.type}
            </div>

            <div className="flex justify-between">
                {/* Trading Pair and Signal Strength */}
                <div>
                    <p className="text-sm font-semibold">{signal.pair}</p>
                    <p className={`text-sm ${signal.strength === 'Strong' ? 'text-green-500' : 'text-red-500'}`}>
                        {signal.strength === 'Strong' ? 'Strong' : 'Regular'} Signal
                    </p>
                </div>

                {/* Timestamp */}
                <div className="text-gray-600 text-xs">
                    {signal.timestamp}
                </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm">{signal.description}</p>

            <hr className="my-2 border-gray-300" />

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-1 text-sm">
                <div>
                    <p className="text-gray-600">Entry Price</p>
                    <p>{signal.entryPrice}</p>
                </div>
                <div>
                    <p className="text-gray-600">Stop-Loss</p>
                    <p>{signal.stopLoss}</p>
                </div>
                <div>
                    <p className="text-gray-600">Take-Profit</p>
                    <p>{signal.takeProfit}</p>
                </div>
            </div>

            {/* User Profile */}
            <div className="mt-2 flex items-center text-sm">
                <Image width={6} height={6}  src={signal.providerAvatar} alt={signal.providerName} className="w-6 h-6 rounded-full" />
                <p className="ml-2">{signal.providerName}</p>
            </div>

            {/* User Comments and Ratings */}
            <div className="mt-2 text-sm text-gray-600">
                <p>Comments: {signal.commentsCount}</p>
                <p>Rating: {signal.rating}/5</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex justify-end space-x-2">
                <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm">
                    Follow Signal
                </button>

                {/* Details Button */}
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 text-sm">
                 Signal Details
                </button> </div>
        </div>
    )
}
