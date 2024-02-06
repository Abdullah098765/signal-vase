'use client'
import React from 'react';
import { MyContextProvider } from '@/app/context/context';
import Navbar from '@/app/components/navbar';
import Sidebar from '../components/sidebar';
import EditProfileModal from '../components/edit-profile-modal';
import BottomNavbar from '../components/mobile-bottem-bar';
import Modal from '../components/signUp-Model';
import RouterLoading from '@/app/components/routerLoading';
import ProfileContent from '../components/ProfileContent';

const Profile = () => {
    return (
        <div>
            <MyContextProvider>
                <RouterLoading />

                <Navbar />

                <div className="flex">
                    <Sidebar />

                    <ProfileContent />
                </div>
                <BottomNavbar />
                <Modal />

            </MyContextProvider>
        </div>
    );
}

export default Profile;
