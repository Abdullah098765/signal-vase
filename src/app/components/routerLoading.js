'use client'

import React from 'react'
import './components.css'
import { useMyContext } from '../context/context';

export default function RouterLoading() {
    const { routerLoading } = useMyContext();

    return (
        <div className=''>
            {routerLoading && <div class="fixed loader-line"></div>}

        </div>
    )
}
