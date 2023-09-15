import React from 'react'
import MainArea from './components/mainArea.js'
import Navbar from './components/navbar.js'

import Topbar from './components/topbar.js'
import NavbarLinks from './components/navLinks.js'
export default function Home() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <NavbarLinks />
            <MainArea />

        </div>
    )
}
