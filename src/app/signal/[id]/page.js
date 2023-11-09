import React from 'react'
import Signal from './Signal'
import { MyContextProvider } from '@/app/context/context'
import Navbar from "../../components/navbar"
export default function page() {
    return (
        <div>
            <MyContextProvider>
                <Navbar />
                <Signal />

            </MyContextProvider>
        </div>
    )
}
