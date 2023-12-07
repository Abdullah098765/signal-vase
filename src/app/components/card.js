'use client'
import React, { useEffect, useState } from 'react';
import SignalModal from './signalModal'
import { formatDistanceToNow } from 'date-fns';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMyContext } from '../context/context';
import { useRouter } from 'next/navigation';
const Card = ({ signal }) => {
    const router = useRouter();

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(signal.likes.length);
    const [dislikeCount, setDislikeCount] = useState(signal.disLikesCount.length);
    const { user, isModalOpen, setIsModalOpen, setRouterLoading, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
    const [following, setFollowing] = useState(false);

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
            fetch("https://signal-hub.vercel.app/api/likescount", requestOptions)
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
                fetch("https://signal-hub.vercel.app/api/dislikesdiscount", requestOptions)
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
            fetch("https://signal-hub.vercel.app/api/likesdiscount", requestOptions)
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
            fetch("https://signal-hub.vercel.app/api/disLikesCount", requestOptions)
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
                fetch("https://signal-hub.vercel.app/api/likesdiscount", requestOptions)
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
            fetch("https://signal-hub.vercel.app/api/dislikesdiscount", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        }
        setDisliked(!disliked);
        setLiked(false);
    };
    useEffect(() => {
        if (signal.followers.indexOf(user._id) !== -1) {
            setFollowing(true)
        }
        else setFollowing(false)
        if (signal.likes.indexOf(user._id) !== -1) {
            setLiked(true)
        }
        if (signal.disLikesCount.indexOf(user._id) !== -1) {
            setDisliked(true)
        }

    }, [])
    const likeIconColor = liked ? 'text-green-500  mr-1' : '  mr-1 border-gray-400 hover:text-green-700 cursor-pointer hover:text-green-500';
    const dislikeIconColor = disliked ? 'text-red-500 ml-2 mr-1' : 'border-gray-400 ml-2 mr-1 cursor-pointer hover:text-red-500 focus:text-red-500';


    return (
        <div>

            <div className="bg-white p-3 card  " key={signal._id}>
                <div className='flex justify-between'>
                    {/* Signal Type Badge */}
                    <div className={`mb-2 ${signal.longOrShort === 'Long' ? 'bg-green-500' : 'bg-red-500'} text-white py-1 px-2 rounded-md text-xs font-semibold inline-block`}>
                        {signal.longOrShort === 'Long' ? "Buy" : "Sell"}
                    </div>
                    {/* Timestamp */}
                    <div className="text-gray-600 text-xs">
                        {formatDistanceToNow(new Date(signal.createdAt), { addSuffix: true })}
                    </div>
                </div>
                <div className="flex justify-between">
                    {/* Trading Pair and Signal Strength */}
                    <div>
                        <p className="text-sm font-semibold">{signal.pair}</p>
                        <p className={`text-sm ${signal.duration >= new Date().getTime() ? 'text-green-500' : 'text-red-500'}`}>
                            {signal.duration >= new Date().getTime() ? 'Active Signal' : 'Expired'}
                        </p>
                    </div>


                </div>

                {/* Description */}
                <p className="mt-2 text-sm overflow-ellipsis truncate">{signal.explanation}</p>

                <hr className="my-2 border-gray-300" />

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-1 text-sm">
                    <div>
                        <p className="text-gray-600">Entry Price 1</p>
                        <p>{signal.entry1}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Entry Price 2</p>
                        <p>{signal.entry2}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Stop-Loss</p>
                        <p>{signal.stopLoss}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Take-Profit 1</p>
                        <p>{signal.takeProfit1}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Take-Profit 2</p>
                        <p>{signal.takeProfit2}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Take-Profit 3</p>
                        <p>{signal.takeProfit3}</p>
                    </div>
                </div>

                {/* User Profile */}
                <div className="mt-2 flex items-center w-fit hover:underline cursor-pointer  text-sm" onClick={() => {
                    setRouterLoading(true)

                    router.push('/signal-provider/' + signal.signalProvider.fIdHash)
                }}>
                    <img src={signal.signalProvider.profilePicture} alt={signal.signalProvider.displayName} className="w-6 h-6 rounded-full object-cover" />
                    <p className="ml-2 cursor-pointer " >{signal.signalProvider.displayName}</p>
                </div>

                {/* User Comments and Ratings */}
                <div className="mt-2 text-sm text-gray-600">
                    <p>Comments: {signal.comments.length}</p>
                    <p>Followers: {signal.followers.length}</p>
                </div>

 


                {/* Action Buttons */}
                <div className="mt-2 flex justify-end space-x-2">


                    {!following ? <button onClick={() => {
                        // getSignals()
                        // setSelectedSignal(signal)
                        // setisSignalModalOpen(true)
                        setRouterLoading(true)
                        router.push('/signal/' + signal._id)

                    }} className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-950 text-sm">
                        Follow Signal
                    </button>
                        :
                        <button onClick={() => {
                            // getSignals()
                            // setSelectedSignal(signal)
                            // setisSignalModalOpen(true)
                            setRouterLoading(true)

                            router.push('/signal/' + signal._id)
                        }} className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 text-sm">
                            See Details
                        </button>
                    }

                    {/* Details Button */}
                    <div className="bg-gray-700 text-white px-4 py-2 rounded-full  text-sm">
                        <div className="flex items-center">
                            {/* Thumbs Up Icon */}
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className={likeIconColor}
                                onClick={() => {
                                    if (window.localStorage.getItem('uid')) {
                                        handleLikeClick()
                                    }
                                    else setIsModalOpen(true)
                                }}
                            />
                            <p>{likeCount}</p>

                            {/* Separator Line */}
                            <div className="separator-line mx-2 border-r border-gray-400 h-5"></div>
                            <p>{dislikeCount}</p>

                            {/* Thumbs Down Icon */}
                            <FontAwesomeIcon
                                icon={faThumbsDown}
                                flip="horizontal"
                                className={dislikeIconColor}
                                onClick={() => {
                                    if (window.localStorage.getItem('uid')) {
                                        handleDislikeClick()

                                    }
                                    else setIsModalOpen(true)

                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
