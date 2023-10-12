import { useEffect, useState } from 'react';
import { useCountdown } from './countDown-timer';

const CountdownClock = ({ duration }) => {

    const [days, hours, minutes, seconds] = useCountdown(duration);

    return (
        <div className=''>
            {
                (days === 0 || hours === 0 || minutes === 0 || seconds === 0) || (days > 0) ?
                    <div className="grid grid-cols-4 gap-0 max-w-3xl countdown-container bg-gray-200 text-xs text-black p-2  xl:mt-0 rounded-full mb-2 lg:mt-4 lg:mb-0 lg:mr-2">
                        <div className="text-sm font-semibold">{days}:</div>
                        <div className="text-sm font-semibold">{hours}:</div>
                        <div className="text-sm font-semibold">{minutes}:</div>
                        <div className="text-sm font-semibold">{seconds}</div>
                    </div> :
                    <div className="">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 text-sm">
                            Good Signal
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-full hover-bg-red-600 text-sm">
                            Bad Signal
                        </button>
                    </div>
            }
        </div>
    );
};

export default CountdownClock;
