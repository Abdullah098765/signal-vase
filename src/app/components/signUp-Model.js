'use client'
import React from 'react';
import RegistrationForm from './Registration-Form.js'
import { useMyContext } from '../context/context.js';

const Modal = () => {
    const { isModalOpen, setIsModalOpen } = useMyContext();

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark overlay */}
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                    <svg
                        className="fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        onClick={()=>{
                            setIsModalOpen(false) 
                        
                        }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 5.293a1 1 0 011.414 0L9 7.586l2.293-2.293a1 1 0 111.414 1.414L10.414 9l2.293 2.293a1 1 0 01-1.414 1.414L9 10.414l-2.293 2.293a1 1 0 01-1.414-1.414L7.586 9 5.293 6.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>

                <div className="modal-content py-4 text-left px-6">

                    <RegistrationForm />

                </div>
            </div>
        </div>
    );
};

export default Modal;
