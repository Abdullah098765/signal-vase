import React from 'react';
import DashboardSidebar from '../../components/DashboardSidebar'
import { MyContextProvider } from '@/app/context/context';
import Navbar from '@/app/components/navbar';
import User from '@/app/components/profile'

const Profile = () => {
    return (
        <div>
            <MyContextProvider>
                <Navbar />

                <div className="flex">
                    <DashboardSidebar />

                    <User />
                </div>
            </MyContextProvider>
        </div>
    );
}

export default Profile;
