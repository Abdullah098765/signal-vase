import React from 'react'
import { useMyContext } from '../context/context';

export default function MainDashboard() {
    const {user, setUser } = useMyContext();

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
