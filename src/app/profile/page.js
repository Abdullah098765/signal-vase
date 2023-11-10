'use client'
import React from 'react';
import { MyContextProvider } from '@/app/context/context';
import Navbar from '@/app/components/navbar';
import User from '@/app/components/profile'
import Sidebar from '../components/sidebar';
import EditProfileModal from '../components/edit-profile-modal';
import BottomNavbar from '../components/mobile-bottem-bar';
import Modal from '../components/signUp-Model';

const Profile = () => {
    return (
        <div>
            <MyContextProvider>
                <Navbar />

                <div className="flex">
                    <Sidebar />

                    <User />
                </div>
                <BottomNavbar />
                <Modal />

            </MyContextProvider>
        </div>
    );
}

export default Profile;
