import React from 'react'
import Signal from './Signal'
import { MyContextProvider } from '@/app/context/context'
import Navbar from "../../components/navbar"
import Modal from '@/app/components/signUp-Model'
export default function page() {
    return (
        <div>
            <MyContextProvider>
                <Navbar />
                <Signal />
                <Modal />
            </MyContextProvider>
        </div>
    )
}
