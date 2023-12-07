import React from 'react'
import Subscription from './Subscription'
import { MyContextProvider } from '../context/context'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

function page() {
    return (
        <div>
             <MyContextProvider>
                <Navbar/>
                <div className='flex '>
                <Sidebar />
                <Subscription/>
                </div>
            </MyContextProvider>
        </div>
    )
}

export default page
