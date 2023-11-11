'use client'
import React from 'react';
import { MyContextProvider } from '../context/context';
import SignalCardList from '../components/following-signal-CardList.js';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import SignalModal from '../components/signalModal';
import BottomNavbar from '../components/mobile-bottem-bar';
import Modal from '../components/signUp-Model.js';

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
                    
                    <BottomNavbar />
                    <Modal />
                </MyContextProvider>
            </div>
        </div>
    );
}

export default FollowingSignals;
