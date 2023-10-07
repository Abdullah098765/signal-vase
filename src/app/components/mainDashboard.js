
'use client'

import React, { useEffect } from 'react'
import { useMyContext } from '../context/context';

export default function MainDashboard() {
    const { user, setUser } = useMyContext();
    useEffect(() => {
        localStorage.setItem('userId', user._id)
        console.log(user);

    }, )
    return (
        <div>
            <div className='absolute left-56'>
                {user.displayName}
                <hr />
                {user.email}
            </div>
        </div>
    )
}
