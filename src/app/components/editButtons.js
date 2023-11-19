'use client'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMyContext } from '../context/context';
import { useRouter } from 'next/navigation';

const EditButtons = ({ShareIcon}) => {
    const { isEditModalOpen, setRouterLoading, setIsEditModalOpen, user } = useMyContext()

    const router = useRouter()
    return (
        <div class="flex items-center  col-buttons  lg:mt-24 xl:mt-24 mt-3">
            <button onClick={() => {
                setRouterLoading(true)
                router.push('/signal_form')
            }} class="flex items-center w-full bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                {/* <Link href={'../signal_form'}> */}

                <button class="whitespace-nowrap " ><FontAwesomeIcon icon={faAdd} className='mr-1' />Create a Signal</button>

                {/* </Link> */}
            </button>
            <button onClick={() => setIsEditModalOpen(true)} class="flex items-center w-full col_button bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <FontAwesomeIcon icon={faEdit} />
                <button class="whitespace-nowrap">Edit Profile</button>
            </button>
           <ShareIcon/>
        </div>

    );
}

export default EditButtons;
