import React from 'react'
import Notifications from './notifications'
import RouterLoading from '../components/routerLoading'
import Navbar from '../components/navbar'
import Modal from '../components/signUp-Model'
import { MyContextProvider } from '../context/context'
import Sidebar from '../components/sidebar'

export default function page() {
    return (
        <div>
            <MyContextProvider>
                <RouterLoading />

                <Navbar />
                <div className='flex'>
                    <Sidebar />
                    <Notifications />
                </div>
                <Modal />
            </MyContextProvider>
        </div>
    )
}
