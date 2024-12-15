"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export default function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isSending, setisSending] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setisSending(true)
        try {
            const res = await fetch('/api/contact_us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setShowPopup(true);
                setisSending(false)

                setName('');
                setEmail('');
                setMessage('');

            } else {
                alert('Error sending message');
                setisSending(false)

            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message');
            setisSending(false)

        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#143d72] to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#071c39] to-transparent"></div>
            <div className="relative z-10 max-w-md w-full">
                <div className="text-center">
                    <h2 className="mt-6 text-4xl font-extrabold text-white">Contact Us</h2>
                    <p className="mt-2 text-sm text-gray-300">
                        {"We'd love to hear from you! Please fill out the form below and we will get in touch with you shortly."}
                    </p>
                </div>
                <form className="mt-8 " onSubmit={handleSubmit}>
                    <div className="rounded-lg shadow-lg p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 border-opacity-30">
                        <div className="mb-4 relative">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-4 py-3 border placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div
                                className="absolute inset-0 border-2 border-transparent rounded-md pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to right, transparent, rgba(20, 61, 114, 0.5), transparent)',
                                }}
                            ></div>
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-4 py-3 border placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div
                                className="absolute inset-0 border-2 border-transparent rounded-md pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to right, transparent, rgba(20, 61, 114, 0.5), transparent)',
                                }}
                            ></div>
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                className="appearance-none rounded-md relative block w-full px-4 py-3 border placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                                placeholder="Your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <div
                                className="absolute inset-0 border-2 border-transparent rounded-md pointer-events-none"
                                style={{
                                    background: 'linear-gradient(to right, transparent, rgba(20, 61, 114, 0.5), transparent)',
                                }}
                            ></div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isSending ? "Sending" : "Send Message"}
                            </button>
                        </div>
                    </div>
                </form>
                {showPopup && (
                    <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
                        <div className="border backdrop-blur-[12px] bg-black bg-opacity-5 rounded-lg p-8 text-center text-white">
                            <h3 className="text-lg font-bold mb-4">Thank You!</h3>
                            <p>Your message has been sent successfully. We appreciate you reaching out to us. Our team will get back to you as soon as possible.</p>
                            <Link className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none" href="/">
                                Go to Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
