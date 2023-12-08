import React from 'react'
import Subscription from './Subscription'
import { MyContextProvider } from '../context/context'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import RouterLoading from '../components/routerLoading'
import Modal from '../components/signUp-Model'
import BottomNavbar from '../components/mobile-bottem-bar'

function page() {
    return (
        <div>
            <MyContextProvider>
                <RouterLoading />
                <Navbar />
                <div className='flex '>
                    <Sidebar />
                    <Subscription />
                </div>
                <Modal />
                <BottomNavbar />
            </MyContextProvider>
        </div>
    )
}

export default page
