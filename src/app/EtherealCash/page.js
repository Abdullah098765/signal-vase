import React from 'react'
import EtherealCash from './Etherealcash'
import { MyContextProvider } from '../context/context'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'
import RouterLoading from '../components/routerLoading'

function page() {
    return (
        <div>
            <MyContextProvider>
            <RouterLoading/>

                <Navbar/>
                <div className='flex '>
                <Sidebar />
                <EtherealCash />
                </div>
            </MyContextProvider>
        </div>
    )
}

export default page
