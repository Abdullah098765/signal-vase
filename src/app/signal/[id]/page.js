import React from 'react'
import Signal from './Signal'
import { MyContextProvider } from '@/app/context/context'
import Navbar from "../../components/navbar"
import Modal from '@/app/components/signUp-Model'
import Sidebar from '@/app/components/sidebar'
export default function page() {
    return (
        <div>
            <MyContextProvider>
                <Navbar />
                <div className='flex'>
                <Sidebar />
                <Signal />
                </div>
                <Modal />
            </MyContextProvider>
        </div>
    )
}
