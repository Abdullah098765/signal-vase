// CreateSignalModal.js
import React, { useState } from 'react';
import CryptoPairSelector from './allCoin'
const CreateSignalModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        entryPrice: '',
        targetPrice: '',
        stopLoss: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send the data to your server).
        console.log(formData);
        // Close the modal after submission
        onClose();
    };

    return (
        <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
            <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"></div>
           
        </div>
    );
};

export default CreateSignalModal;
