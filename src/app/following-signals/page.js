'use client'
import React from 'react';
import { MyContextProvider } from '../context/context';
import SignalCardList from '../components/following-signal-CardList.js';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import SignalModal from '../components/signalModal';

function FollowingSignals() {


    return (
        <div>
            <div>
                <MyContextProvider>
                    <Navbar />

                    <SignalModal />

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
