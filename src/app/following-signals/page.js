import React from 'react';
import { MyContextProvider } from '../context/context';
import SignalCardList from '../components/following-signal-CardList.js';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

function FollowingSignals() {


    return (
        <div>
            <div>
                <MyContextProvider>
                    <Navbar />


                    <div className="flex">
                        <Sidebar />
                        <SignalCardList />
                    </div>
                </MyContextProvider>
            </div>
        </div>
    );
}

export default FollowingSignals;
