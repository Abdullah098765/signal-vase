import React from 'react'
import './components.css'
export default function Card({ signal }) {
    return (
        <div key={signal.id} className="bg-white shadow-md p-4 rounded-lg card">
            {/* Signal Type Badge */}
            <div className={`mb-2 ${signal.type === 'Buy' ? 'bg-green-500' : 'bg-red-500'} text-white py-1 px-2 rounded-md text-sm font-semibold inline-block`}>
                {signal.type}
            </div>

            {/* Trading Pair */}
            <div className="text-lg font-semibold">{signal.pair}</div>

            {/* Signal Strength Indicator */}
            <div className={`text-sm mt-1 ${signal.strength === 'strong' ? 'text-green-500' : 'text-red-500'}`}>
                {signal.strength === 'strong' ? 'Strong' : 'Regular'} Signal
            </div>

            {/* Description */}
            <p className="mt-3">{signal.description}</p>

            {/* Key Metrics */}
            <div className="mt-3">
                <p className="text-gray-600">Entry Price: {signal.entryPrice}</p>
                <p className="text-gray-600">Stop-Loss: {signal.stopLoss}</p>
                <p className="text-gray-600">Take-Profit: {signal.takeProfit}</p>
            </div>

            {/* Timestamp */}
            <div className="mt-3 text-gray-600">
                <p>{signal.timestamp}</p>
            </div>

            {/* User Profile */}
            <div className="mt-3 flex items-center">
                <img src={signal.providerAvatar} alt={signal.providerName} className="w-6 h-6 rounded-full" />
                <p className="ml-2">{signal.providerName}</p>
            </div>

            {/* User Comments and Ratings */}
            <div className="mt-3">
                <p className="text-gray-600">Comments: {signal.commentsCount}</p>
                <p className="text-gray-600">Rating: {signal.rating}/5</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Copy Signal</button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400">Details</button>
            </div>
        </div>
    )
}
