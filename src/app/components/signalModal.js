
'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faPerson } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';
import './components.css'
import { useCountdown } from './countDown-timer';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from '../context/context';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Subscribe from './Subscribe';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function SignalModal() {
    const { user, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
    const signal = selectedSignal

    const [days, hours, minutes, seconds] = useCountdown(signal && signal.duration);
    const [isLoading, setIsLoading] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [copyentry1, setcopyentry1] = useState('Copy');
    const [copyentry2, setCopyentry2] = useState('Copy');
    const [copytp1, setCopytp1] = useState('Copy');
    const [copytp2, setCopytp2] = useState('Copy');
    const [copytp3, setCopytp3] = useState('Copy');
    const [copysl, setCopysl] = useState('Copy');
    const [following, setFollowing] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(signal.likes && signal.likes.length);
    const [dislikeCount, setDislikeCount] = useState(signal.disLikesCount && signal.disLikesCount.length);
    const [showTimer, setShowTimer] = useState(true);

    useEffect(() => {
        if (showComments) {
            const commentSection = document.getElementById('comment-section');
            if (commentSection) {
                commentSection.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    }, [showComments]);


    // Handle like and dislike counts


    // Function to toggle the comment section visibility
    const toggleComments = () => {
        setShowComments(!showComments);
    };
    // Handle like and dislike button colors based on user interaction
    const handleCommentSubmit = () => {
        // Implement your like logic here
    };
    const handleFollow = () => {
        setIsLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signal._id,
            'followerId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:3000/api/add-follower", requestOptions)
            .then(response => response.text())
            .then(result => {
                setFollowing(true)

                setIsLoading(false)
            })
            .catch(error => console.log('error', error));
    };
    const handleUnFollow = () => {
        setIsLoading(true)

        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signal._id,
            'followerId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://localhost:3000/api/remove-follower", requestOptions)
            .then(response => response.text())
            .then(result => {
                setFollowing(false)
                setIsLoading(false)
            })
            .catch(error => console.log('error', error));
    };



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


    const handleLikeClick = () => {
        if (!liked) {
            var myHeaders = new Headers();
            myHeaders.append("a", "dni");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "signalId": signal._id,
                'likerId': user._id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:3000/api/likescount", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

            setLikeCount(likeCount + 1);
            if (disliked) {
                var myHeaders = new Headers();
                myHeaders.append("a", "dni");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "signalId": signal._id,
                    'likerId': user._id
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch("http://localhost:3000/api/dislikesdiscount", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));

                setDislikeCount(disliked ? dislikeCount - 1 : dislikeCount);

            }
        }
        else {
            setLikeCount(likeCount - 1);
            var myHeaders = new Headers();
            myHeaders.append("a", "dni");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "signalId": signal._id,
                'likerId': user._id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:3000/api/likesdiscount", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        setLiked(!liked);
        setDisliked(false);
    };

    const handleDislikeClick = () => {
        if (!disliked) {

            var myHeaders = new Headers();
            myHeaders.append("a", "dni");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "signalId": signal._id,
                'likerId': user._id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:3000/api/disLikesCount", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            setDislikeCount(dislikeCount + 1);
            if (liked) {
                var myHeaders = new Headers();
                myHeaders.append("a", "dni");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "signalId": signal._id,
                    'likerId': user._id
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch("http://localhost:3000/api/likesdiscount", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                setLikeCount(liked ? likeCount - 1 : likeCount);

            }
        }
        else {
            setDislikeCount(dislikeCount - 1);
            var myHeaders = new Headers();
            myHeaders.append("a", "dni");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "signalId": signal._id,
                'likerId': user._id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://localhost:3000/api/dislikesdiscount", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        }
        setDisliked(!disliked);
        setLiked(false);
    };
    useEffect(() => {
        setTimeout(() => {
            setShowTimer(false)

        }, 1000);
        if (signal.followers) {
            if (signal.followers.indexOf(user._id) !== -1) {
                setFollowing(true)
                console.log(signal.followers.indexOf(user._id));
            }
            if (signal.likes.indexOf(user._id) !== -1) {
                setLiked(true)
            }
            if (signal.disLikesCount.indexOf(user._id) !== -1) {
                setDisliked(true)
            }

        }
    }, [])
    const likeIconColor = liked ? 'text-green-500  mr-1' : '  mr-1 border-gray-400 hover:text-green-700 cursor-pointer hover:text-green-500';
    const dislikeIconColor = disliked ? 'text-red-500 ml-2 mr-1' : 'border-gray-400 ml-2 mr-1 cursor-pointer hover:text-red-500 focus:text-red-500';


    if (!isSignalModalOpen && selectedSignal) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <button
                onClick={() => {
                    getSignals()
                    setSelectedSignal({})

                    setisSignalModalOpen(!isSignalModalOpen)
                }}
                className='text-white absolute top-3 right-3 text-2xl'
            >
                <FontAwesomeIcon icon={faTimes} />

            </button>
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

                {showTimer ? (
                    signal.duration > Date.now() ? <div className="bg-black text-white p-8 mb-3 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                            <div className="text-xl font-semibold">Signal will expire in</div>
                        </div>
                        <div className="grid grid-cols-4 gap-0">
                            <div className="text-center">
                                <div className="text-3xl font-semibold">{days}</div>
                                <div className="text-sm">Days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-semibold">{hours}</div>
                                <div className="text-sm">Hours</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-semibold">{minutes}</div>
                                <div className="text-sm">Minutes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-semibold">{seconds}</div>
                                <div className="text-sm">Seconds</div>
                            </div>
                        </div>
                    </div> :
                        <div className="bg-yellow-300 text-black p-8 mb-3 rounded-lg shadow-lg">
                            <div className="text-center">
                                <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                                <div className="text-xl font-semibold mt-2">Warning: Signal has expired</div>
                            </div>
                        </div>
                ) :
                    (<div className="w-full h-full border-t-2 border-gray-500 border-solid rounded-full animate-spin"></div>)
                }




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
                                {signal.signalProvider.goodSignals.length} Good Signals
                            </div>
                            <div className="signal-info bg-gray-200 text-xs text-black p-2 rounded-full  xl:mt-0 mb-2 lg:mt-4 lg:mb-0 lg:mr-2">
                                {signal.signalProvider.badSignals.length} Bad Signalse
                            </div>
                            <div className="signal-info bg-gray-200 text-xs text-black p-2 mb-2 lg:mb-0  xl:mt-0 lg:mt-4 rounded-full">
                                {signal.signalProvider.Subscribers.length} Subscribers
                            </div>
                        </div>
                        <div className='flex items-center mt-4 lg:mt-0'>
                            {signal.signalProvider._id !== user._id ? <Subscribe targetUser={signal.signalProvider} /> : <button onClick={() => window.location.href = 'profile'} class="flex items-center bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <FontAwesomeIcon icon={faUser} />
                                <span>    Go To Profile</span>
                            </button>
                            }
                        </div>
                    </div>

                </div>

                {/* User Profile */}


                {/* Comments Section */}


                {/* Action Buttons */}
                <div className="mt-4 flex justify-end space-x-2">
                    {!following ?
                        < button onClick={handleFollow} className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm">

                            {isLoading ? (
                                <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                            ) : (
                                'Follow Signal'
                            )}
                        </button> : <button onClick={handleUnFollow} className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-950 text-sm">
                            {isLoading ? (
                                <div className="w-5 h-5 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
                            ) : (
                                'Unfollow Signal'
                            )}
                        </button>

                    }

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

                {/* Above content (your existing code) */}
                <div>
                    {/* Content above the comment section */}
                    {/* Add a button to toggle the comment section */}
                    <button
                        className={`bg-black sm:mt-2 text-white px-4 py-2 rounded-full hover:bg-gray-900 text-sm ${showComments ? 'bg-gray-900' : ''
                            }`}
                        onClick={toggleComments}
                    >
                        {showComments ? 'Hide Comments' : 'Show Comments'}
                    </button>

                    {/* Comment section with animation and auto-scroll */}
                    <div
                        id="comment-section"
                        className={`mt-4 border-t border-gray-300 pt-4  ${showComments ? 'max-h-screen transition-max-height ease-out duration-300' : 'max-h-0 overflow-hidden'
                            }`}
                    >
                        {/* Comment input form */}

                        <h3 className="text-lg font-semibold mb-2 text-black">Comments</h3>
                        {/* Loop through and render comments */}
                        {signal.comments.map((comment, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center text-sm">
                                    <img
                                        src={comment.user.profilePicture}
                                        alt={comment.user.displayName}
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <p className="ml-2 font-semibold text-black">{comment.user.displayName}</p>
                                </div>
                                <p className="mt-2 text-sm text-black">{comment.text}

                                </p>

                                {/* Display timestamp */}
                                <p className="mt-1 text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </p>
                            </div>

                        ))}
                        <div className="mt-6">
                            <div className="flex flex-col items-stretch justify-center">

                                <textarea
                                    type="text"
                                    className="w-full bg-gray-100 rounded p-2  focus:outline-none"
                                    placeholder="Write your comment..."
                                />
                                <button
                                    className={`bg-black text-white flex justify-center mt-3 mb-3  p-2  rounded hover:bg-gray-900 ml-2 ${showComments ? 'bg-gray-900' : ''
                                        }`}
                                    onClick={handleCommentSubmit}
                                >
                                    <img
                                        src={user.profilePicture}
                                        alt={user.displayName}
                                        className="w-6 h-6 rounded-full mr-2"
                                    />  Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    );
}

export default SignalModal;
