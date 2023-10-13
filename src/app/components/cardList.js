import React, { useEffect } from 'react';
import "./components.css"
import { useMyContext } from '../context/context'
import Card from './card.js'
const SignalCardList = ({ }) => {



    const { signals, setSignals, getSignals, lineClicked, closeSidenav } = useMyContext()
    useEffect(() => {
        getSignals()
        console.log(signals);
    },[])

    const windowWidth = window.innerWidth;

    useEffect(() => {
        console.log("Browser window width: " + windowWidth + " pixels");
        if (!lineClicked) {
            if (windowWidth <= 1100) {
                closeSidenav(false)
            }

        }
        if (windowWidth >= 1100) {
            closeSidenav(true)
        }

    }, [windowWidth])

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
