import React, { useEffect } from 'react';
import "./components.css"
import { useMyContext } from '../context/context'
import Card from './card.js'
const SignalCardList = ({ }) => {



    const { signals, setSignals } = useMyContext()
    useEffect(() => {
        console.log(signals);
    },)


    return (
        <div className='webkit-fill-available'>
            <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-0 md:p-5">
                {signals ? signals.map((signal) => (
                    <Card signal={signal} />
                )) : 'No Signal Yet'}
            </div>
        </div>
    );
};

export default SignalCardList;
