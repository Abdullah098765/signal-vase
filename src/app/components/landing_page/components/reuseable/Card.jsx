import React from 'react';
import Image from 'next/image';
import sampleImage from '../../../public/digital_coin3.jpg'; // replace with your image path

const Card = ({ cardData }) => {
    return (
        <div className="bg-transparent rounded-lg shadow-lg relative overflow-hidden ">
            <div className="relative w-full h-48 mb-4">
                <Image
                    src={cardData.image}
                    alt="Sample"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-md"
                />
            </div>
            <div className='p-3'>
                <h2 className="text-xl font-bold text-white mb-2">{cardData.title}</h2>
                <p className="text-white mb-4">
                    {cardData.description}
                </p>
            
            </div>
            <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                background: 'linear-gradient(0deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                filter: 'blur(4px)'
            }} />
        </div>
    );
};

export default Card;
