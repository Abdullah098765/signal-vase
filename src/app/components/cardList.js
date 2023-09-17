import React from 'react';
import Card from './Card'

const SignalCardList = ({ }) => {

    var signals = [

        {
            id: 15565437,
            type: 'Sell', // or 'Sell', 'Hold', 'Strong Buy', 'Strong Sell', etc.
            pair: 'BTC/USD',
            strength: 'Strong', // or 'Regular'
            description: 'This is a demo trading signal for BTC/USD. It suggests a strong buy position based on technical analysis.',
            entryPrice: '$40,000',
            stopLoss: '$39,500',
            takeProfit: '$42,000',
            timestamp: '2023-09-15 10:30 AM',
            providerName: 'Sabir trader',
            providerAvatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s288-c-no',
            commentsCount: 8,
            rating: 4.5, // out of 5
        },
        {
            id: 6371,
            type: 'Sell', // or 'Sell', 'Hold', 'Strong Buy', 'Strong Sell', etc.
            pair: 'LTC/USD',
            strength: 'Strong', // or 'Regular'
            description: 'This is a demo trading signal.',
            entryPrice: '$40,000',
            stopLoss: '$39,500',
            takeProfit: '$42,000',
            timestamp: '2023-09-15 10:30 AM',
            providerName: 'Sabir trader',
            providerAvatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s288-c-no',
            commentsCount: 8,
            rating: 4.5, // out of 5
        },
        {
            id: 164,
            type: 'Buy', // or 'Sell', 'Hold', 'Strong Buy', 'Strong Sell', etc.
            pair: 'DOGE/USD',
            strength: 'Strong', // or 'Regular'
            description: 'This is a demo trading signal for BTC/USD. It suggests a strong buy position based on technical analysis.',
            entryPrice: '$40,000',
            stopLoss: '$39,500',
            takeProfit: '$42,000',
            timestamp: '2023-09-15 10:30 AM',
            providerName: 'Sabir trader',
            providerAvatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s288-c-no',
            commentsCount: 8,
            rating: 4.5, // out of 5
        },
        {
            id: 13564,
            type: 'Buy', // or 'Sell', 'Hold', 'Strong Buy', 'Strong Sell', etc.
            pair: 'ETH/USD',
            strength: 'Strong', // or 'Regular'
            description: 'This is a demo trading signal for BTC/USD. It suggests a strong buy position based on technical analysis.',
            entryPrice: '$40,000',
            stopLoss: '$39,500',
            takeProfit: '$42,000',
            timestamp: '2023-09-15 10:30 AM',
            providerName: 'Sabir trader',
            providerAvatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s288-c-no',
            commentsCount: 8,
            rating: 4.5, // out of 5
        },
        {
            id: 146644653,
            type: 'Buy', // or 'Sell', 'Hold', 'Strong Buy', 'Strong Sell', etc.
            pair: 'BTC/USD',
            strength: 'Strong', // or 'Regular'
            description: 'This is a demo trading signal for BTC/USD. It suggests a strong buy position based on technical analysis.',
            entryPrice: '$40,000',
            stopLoss: '$39,500',
            takeProfit: '$42,000',
            timestamp: '2023-09-15 10:30 AM',
            providerName: 'Sabir trader',
            providerAvatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s288-c-no',
            commentsCount: 8,
            rating: 4.5, // out of 5
        },
        {
            id: 3531,
            type: 'Sell', // or 'Sell', 'Hold', 'Strong Buy', 'Strong Sell', etc.
            pair: 'ETH/USD',
            strength: 'Strong', // or 'Regular'
            description: 'This is a demo trading signal for BTC/USD. It suggests a strong buy position based on technical analysis.',
            entryPrice: '$40,000',
            stopLoss: '$39,500',
            takeProfit: '$42,000',
            timestamp: '2023-09-15 10:30 AM',
            providerName: 'Sabir trader',
            providerAvatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s288-c-no',
            commentsCount: 8,
            rating: 4.5, // out of 5
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-0 md:p-5">
            {signals.map((signal) => (

                <Card signal={signal} />

            ))}




        </div>
    );
};

export default SignalCardList;
