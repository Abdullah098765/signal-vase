'use client'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMyContext } from '../context/context';

const EditButtons = () => {
    const { isEditModalOpen, setIsEditModalOpen, user } = useMyContext()


    return (
        <div class="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-3 lg:mt-24 xl:mt-24">
            <button class="flex items-center bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <Link href={'../signal_form'}>
                    <FontAwesomeIcon icon={faAdd} />
                    <button class="whitespace-nowrap ml-1">Create a Signal</button>
                </Link>
            </button>
            <button onClick={() => setIsEditModalOpen(true)} class="flex items-center bg-gray-600 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <FontAwesomeIcon icon={faEdit} />
                <button class="whitespace-nowrap">Edit Profile</button>
            </button>
        </div>

    );
}

export default EditButtons;
