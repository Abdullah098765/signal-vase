import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';

const GoodBadButtons = ({ signal }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(signal.likes.length);
    const [dislikeCount, setDislikeCount] = useState(signal.disLikesCount.length);
    const { user, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
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
            fetch("http://localhost:3000/api/good-count", requestOptions)
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
                fetch("http://localhost:3000/api/bad-discount", requestOptions)
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
            fetch("http://localhost:3000/api/good-discount", requestOptions)
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
            fetch("http://localhost:3000/api/bad-count", requestOptions)
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
                fetch("http://localhost:3000/api/good-discount", requestOptions)
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
            fetch("http://localhost:3000/api/bad-discount", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        }
        setDisliked(!disliked);
        setLiked(false);
    };
    useEffect(() => {


        if (signal.good.indexOf(user._id) !== -1) {
            setLiked(true)
        }
        if (signal.bad.indexOf(user._id) !== -1) {
            setDisliked(true)
        }

    }, [])
    const likeIconColor = liked ? 'bg-green-800 border border-green-100 text-white px-1 py-1 rounded-full hover:bg-green-700 text-xs flex items-center' : 'border border-green-500 text-green-500 px-1 py-1 rounded-full hover:bg-green-100 text-xs flex items-center';
    const dislikeIconColor = disliked ? ' bg-red-800 border border-red-100  text-white px-1 py-1 rounded-full hover:bg-red-700 text-xs flex items-center' : 'border border-red-500  text-red-500 px-1 py-1 rounded-full hover:bg-red-100 text-xs flex items-center';

    return (
        <div>
            <div className="max-w-3xl mx-auto flex space-x-4">
                <button onClick={handleLikeClick} className={likeIconColor + ""}>


                    Good Signal
                </button>
                <button onClick={handleDislikeClick} className={dislikeIconColor + ""}>


                    Bad Signal
                </button>
            </div>
        </div>
    );
}

export default GoodBadButtons;
