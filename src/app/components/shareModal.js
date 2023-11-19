// ShareModal.js
import React, { useState } from 'react';
import ShareButton from './shareButton.js';
import "./components.css"
function ShareModal({ isOpen, onRequestClose, id, title }) {

    const [copySuccess, setCopySuccess] = useState(false);
    const url = window.location.href;

const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
};


return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 flex items-baseline justify-center z-50`}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white w-96 relative z-10  mx-auto  mt-20 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Share this Signal</h2>

            {/* Share Buttons */}
            <ShareButton
                url={url}

                description={`Check out this trading signal: ${title}`}
            />

            {/* URL Box with Copy Button */}
            <div className="mb-4">
                <div className="flex">
                    <input
                        className="flex-1 border border-gray-300 p-2 rounded-md mr-2"
                        type="text"
                        value={url}
                        readOnly
                    />
                    <button
                        className={"bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"}
                        onClick={copyToClipboard}
                    >
                        {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>

            <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                onClick={onRequestClose}
            >
                Close
            </button>
        </div>
    </div>
);
}

export default ShareModal;
