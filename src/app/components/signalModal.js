
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import './components.css'

function SignalModal({ }) {
    if (!true) return null;

    var signal = {
        "_id": "6522f2aa8c9f93a0efade078",
        "signalProvider": {
            "notificationPreferences": {
                "email": true,
                "inApp": true
            },
            "_id": "652141a91db996b419bd6afe",
            "displayName": "Sabir Ali.",
            "email": "ssmmhazz@gmail.com",
            "fireBaseUid": "6ildueoonpvab1qbkkp4vog48vf2",
            "profilePicture": "https://lh3.googleusercontent.com/a/ACg8ocJ3WgwM8h0RdNmZZZFRgliLZOLzZAcr5AUCIftnR4UUwIU=s96-c",
            "followers": [],
            "following": [],
            "signalsPosted": [],
            "SuccessfulSignals": [],
            "UnsuccessfulSignals": [],
            "reviews": [],
            "accountStatus": "active",
            "registrationDate": "2023-10-07T11:31:53.764Z",
            "__v": 0
        },
        "cryptoOrStock": "Crypto",
        "duration": "4",
        "entry1": 4,
        "entry2": 34,
        "explanation": "Find the best freelance jobs Browse jobs posted on Upwork, or jump right in and create a free profile to find the work that you love to do.",
        "longOrShort": "Long",
        "pair": "TRB/USDT",
        "stopLoss": 4,
        "takeProfit1": 43,
        "takeProfit2": 43,
        "takeProfit3": 34,
        "isSuccess": false,
        "likes": [],
        "disLikesCount": [
            "652141a91db996b419bd6afe"
        ],
        "followersCount": 0,
        "createdAt": "2023-10-08T18:19:22.080Z",
        "comments": [],
        "__v": 0
    }

    // Handle like and dislike counts
    const likeCount = signal.likes.length;
    const dislikeCount = signal.disLikesCount.length;

    // Handle like and dislike button colors based on user interaction
    const handleLikeClick = () => {
        // Implement your like logic here
    };

    const handleDislikeClick = () => {
        // Implement your dislike logic here
    };

    const [copyentry1, setcopyentry1] = useState('Copy');
    const [copyentry2, setCopyentry2] = useState('Copy');
    const [copytp1, setCopytp1] = useState('Copy');
    const [copytp2, setCopytp2] = useState('Copy');
    const [copytp3, setCopytp3] = useState('Copy');
    const [copysl, setCopysl] = useState('Copy');

    const handleCopyClick = (value, name) => {
        navigator.clipboard.writeText(value)
            .then(() => {

                if (name === 'entry1') {
                    setcopyentry1('Copied');
                    setTimeout(() => {
                        setcopyentry1('Copy');
                    }, 1000); // Reset back to "Copy" after 1 second
                }
                else if (name === 'entry2') {
                    setCopyentry2('Copied');
                    setTimeout(() => {
                        setCopyentry2('Copy');
                    }, 1000); // Reset back to "Copy" after 1 second
                }
                else if (name === 'sl') {
                    setCopysl('Copied');
                    setTimeout(() => {
                        setCopysl('Copy');
                    }, 1000); // Reset back to "Copy" after 1 second
                }
                else if (name === 'tp1') {
                    setCopytp1('Copied');
                    setTimeout(() => {
                        setCopytp1('Copy');
                    }, 1000); // Reset back to "Copy" after 1 second
                }
                else if (name === 'tp2') {
                    setCopytp2('Copied');
                    setTimeout(() => {
                        setCopytp2('Copy');
                    }, 1000); // Reset back to "Copy" after 1 second
                }
                else if (name === 'tp3') {
                    setCopytp3('Copied');
                    setTimeout(() => {
                        setCopytp3('Copy');
                    }, 1000); // Reset back to "Copy" after 1 second
                }

            })
            .catch((err) => {
                console.error('Copy failed:', err);
            });
    }
    // Define the initial icon colors
    const likeIconColor = 'text-gray-400';
    const dislikeIconColor = 'text-gray-400';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 w-full md:w-2/3 lg:w-1/2 xl:w-3/5 rounded-lg shadow-lg overflow-y-auto max-h-40rem">
                {/* Modal content goes here */}


                <div className='flex justify-between'>
                    <div className={`mb-2 ${signal.longOrShort === 'Long' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} py-1 px-2 rounded-md text-xs font-semibold inline-block shadow-md`}>
                        {signal.longOrShort === 'Long' ? "Buy" : "Sell"}
                    </div>

                    <div className="text-gray-600 text-xs">
                        {formatDistanceToNow(new Date(signal.createdAt), { addSuffix: true })}
                    </div>
                </div>

                <div className="mb-4 flex-col mt-3 bg-white  border-b">
                    <h2 className="text-3xl font-semibold mb-2  text-black border-b-2 border-black">
                        {signal.pair}
                    </h2>

                    <h3 className="text-lg font-semibold text-black mt-4 mb-2">Explanation</h3>
                    <p className="text-gray-500 text-lg">{signal.explanation}</p>
                </div>






                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
                    <div className="grid grid-cols-2 gap-4">

                        <div className="border rounded p-2">
                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Entry 1</p>
                                <button
                                    className={`  bg-gray-300 text-black px-2 py-1 text-xs rounded transition-opacity ${copyentry1 === 'Copied' ? 'opacity-0' : 'opacity-100'}`}
                                    onClick={() => handleCopyClick(signal.entry1, 'entry1')}
                                >
                                    {copyentry1}
                                </button>
                            </div>
                            <p className="text-lg">{signal.entry1}</p>
                        </div>
                        <div className="border rounded p-2">
                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Entry 2</p>
                                <button
                                    className={`  bg-gray-300 text-black px-2 py-1 text-xs rounded transition-opacity ${copyentry2 === 'Copied' ? 'opacity-0' : 'opacity-100'}`}
                                    onClick={() => handleCopyClick(signal.entry2, 'entry2')}
                                >
                                    {copyentry2}
                                </button>
                            </div>
                            <p className="text-lg">{signal.entry2}</p>
                        </div>

                        <div className="border rounded p-2">
                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Stop Loss</p>

                                <button
                                    className={`  bg-gray-300 text-black px-2 py-1 text-xs rounded transition-opacity ${copysl === 'Copied' ? 'opacity-0' : 'opacity-100'}`}
                                    onClick={() => handleCopyClick(signal.stopLoss, 'sl')}
                                >
                                    {copysl}
                                </button>
                            </div>
                            <p className="text-lg">{signal.stopLoss}</p>
                        </div>
                        <div className="border rounded p-2">
                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Take Profit 1</p>

                                <button
                                    className={`  bg-gray-300 text-black px-2 py-1 text-xs rounded transition-opacity ${copytp1 === 'Copied' ? 'opacity-0' : 'opacity-100'}`}
                                    onClick={() => handleCopyClick(signal.takeProfit1, 'tp1')}
                                >
                                    {copytp1}
                                </button>
                            </div>
                            <p className="text-lg">{signal.takeProfit1}</p>
                        </div>
                        <div className="border rounded p-2">

                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Take Profit 2</p>

                                <button
                                    className={`  bg-gray-300 text-black px-2 py-1 text-xs rounded transition-opacity ${copytp2 === 'Copied' ? 'opacity-0' : 'opacity-100'}`}
                                    onClick={() => handleCopyClick(signal.takeProfit2, 'tp2')}
                                >
                                    {copytp2}
                                </button>
                            </div><p className="text-lg">{signal.takeProfit2}</p>
                        </div>
                        <div className="border rounded p-2">

                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Take Profit 3</p>

                                <button
                                    className={`  bg-gray-300 text-black px-2 py-1 text-xs rounded transition-opacity ${copytp3 === 'Copied' ? 'opacity-0' : 'opacity-100'}`}
                                    onClick={() => handleCopyClick(signal.takeProfit3, 'tp3')}
                                >
                                    {copytp3}
                                </button>
                            </div><p className="text-lg">{signal.takeProfit3}</p>
                        </div>
                        <div className="border rounded p-2">

                            <div className='flex justify-between'>
                                <p className="text-sm font-semibold">Crypto/Stock</p>


                            </div>
                            <p className="text-lg">{signal.cryptoOrStock}</p>

                        </div>

                        <div className="border rounded p-2">
                            <p className="text-sm font-semibold">Long/Short</p>
                            <p className="text-lg">{signal.longOrShort}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4'>
                    <div className="mt-4 border rounded p-4 flex flex-col lg:flex-row lg:justify-between xl:justify-between items-center">
                        <div className="flex items-center  md:justify-center sm:justify-center ">
                            <img
                                className="w-12 h-12 rounded-full mr-4"
                                src={signal.signalProvider.profilePicture}
                                alt={signal.signalProvider.displayName}
                            />
                            <div>
                                <h4 className="text-lg font-semibold">
                                    {signal.signalProvider.displayName}
                                </h4>
                            </div>
                        </div>
                        <div className="xl:flex flex-col sm:block md:block justify-stretch  items-center mt-4  lg:mt-4 xl:mt-0 xl:flex-row">
                            <div className="signal-info bg-gray-200 text-xs text-black p-2  xl:mt-0 rounded-full mb-2 lg:mt-4 lg:mb-0 lg:mr-2">
                                {signal.signalProvider.winLoseRatio || 324} SuccessfulSignals
                            </div>
                            <div className="signal-info bg-gray-200 text-xs text-black p-2 rounded-full  xl:mt-0 mb-2 lg:mt-4 lg:mb-0 lg:mr-2">
                                {signal.signalProvider.winLoseRatio || 103} UnsuccessfulSignals
                            </div>
                            <div className="signal-info bg-gray-200 text-xs text-black p-2 mb-2 lg:mb-0  xl:mt-0 lg:mt-4 rounded-full">
                                {signal.signalProvider.followers || '3.4k'} 3.4k Subscribers
                            </div>
                        </div>
                        <div className='flex items-center mt-4 lg:mt-0'>
                            <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-900 text-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* User Profile */}


                {/* Comments Section */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    {/* Loop through and render comments */}
                    {signal.comments.map((comment, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex items-center text-sm">
                                <img
                                    src={comment.user.profilePicture}
                                    alt={comment.user.displayName}
                                    className="w-6 h-6 rounded-full"
                                />
                                <p className="ml-2">{comment.user.displayName}</p>
                            </div>
                            <p className="mt-2 text-sm">{comment.text}</p>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex justify-end space-x-2">
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm">
                        Follow Signal
                    </button>

                    <div className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className={likeIconColor}
                                onClick={handleLikeClick}
                            />
                            <p>{likeCount}</p>
                            <div className="separator-line mx-2 border-r border-gray-400 h-5"></div>
                            <p>{dislikeCount}</p>
                            <FontAwesomeIcon
                                icon={faThumbsDown}
                                flip="horizontal"
                                className={dislikeIconColor}
                                onClick={handleDislikeClick}
                            />
                        </div>
                    </div>
                </div>

                {/* Close button */}
                <button
                    className="mt-4 text-sm text-gray-600 hover:text-gray-800 ml-auto"
                //   onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SignalModal;
