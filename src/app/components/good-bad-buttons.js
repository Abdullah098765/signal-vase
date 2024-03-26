import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';

const GoodBadButtons = ({ signal }) => {
    const [currentVote, setCurrentVote] = useState('none');

    // const [neutraled, setNeutraled] = useState(false);
    // const [beenBad, setBeenBad] = useState(false);
    // const [beenGood, setBeenGood] = useState(false);
    const [neutraledCount, setNeutraledCount] = useState(signal.likes.length);
    // const [beenBadCount, setBeenBadCount] = useState(signal.disLikesCount.length);
    const { user, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
    const [following, setFollowing] = useState(false);


    function addNeutral(signalId, userId, setNeutraledCount, neutraledCount) {
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signalId,
            'neutralId': userId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/neutral-count", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)})
            .catch(error => console.log('error', error));

        return "Neutral counted"
    }
    function addGood(signalId, userId, setNeutraledCount, neutraledCount) {
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signalId,
            'goodcounterId': userId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/good-count", requestOptions)
            .then(response => response.text())
            .then(result => {

                console.log(result)
            })
            .catch(error => console.log('error', error));

        return "Good counted"

    }
    function badCount() {

        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signal._id,
            'badCounterId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/bad-count", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    function goodDiscount() {
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signal._id,
            'goodDiscounterId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/good-discount", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        setNeutraledCount(neutraledCount + 1);
    }
    function badDiscount() {
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signal._id,
            'badCounterId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/bad-discount", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }
    function neutralDiscount() {
        setNeutraledCount(neutraledCount - 1);
        var myHeaders = new Headers();
        myHeaders.append("a", "dni");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "signalId": signal._id,
            'counterId': user._id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/api/neutral-discount", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

 


    const handleGoodClick = () => {

        if (currentVote !== 'good') {
            addGood(signal._id, user._id, setNeutraledCount, neutraledCount)
            setCurrentVote('good')
            if (currentVote === 'bad') {

                badDiscount()

            }
            if (currentVote === 'neutral') {

                neutralDiscount()

            }

        }
        else {
            goodDiscount()
            setCurrentVote('none')

        }
    }
    const handleNeutralClick = () => {
        if (currentVote !== 'neutral') {
            addNeutral(signal._id, user._id, setNeutraledCount, neutraledCount)
            setCurrentVote('neutral')

            if (currentVote === 'bad') {

                badDiscount()

            }
            if (currentVote === 'good') {

                goodDiscount()

            }
        }
        else {
            neutralDiscount()
            setCurrentVote('none')

        }


    };

    const handleBadClick = () => {
        if (currentVote !== 'bad') {

            badCount()
            setCurrentVote('bad')

            if (currentVote === 'neutral') {

                neutralDiscount()

            }
            if (currentVote === 'good') {

                goodDiscount()

            }
        }
        else {
            badDiscount()
            setCurrentVote('none')
        }


    };


    useEffect(() => {


        if (signal.good.indexOf(user._id) !== -1) {
            setCurrentVote('good')
        }
        if (signal.neutral.indexOf(user._id) !== -1) {
            setCurrentVote('neutral')
        }
        if (signal.bad.indexOf(user._id) !== -1) {
            setCurrentVote('bad')
        }

    }, [])

    const neutraledIconColor = currentVote === "neutral" ? 'bg-blue-800 border border-blue-100 text-white px-1 py-1 rounded-full hover:bg-blue-700 text-xs flex items-center' : 'border border-blue-500 text-blue-500 px-1 py-1 rounded-full hover:bg-blue-100 text-xs flex items-center';
    const dislikeIconColor = currentVote === 'bad' ? ' bg-red-800 border border-red-100  text-white px-1 py-1 rounded-full hover:bg-red-700 text-xs flex items-center' : 'border border-red-500  text-red-500 px-1 py-1 rounded-full hover:bg-red-100 text-xs flex items-center';
    const beenGoodClasses = currentVote === 'good' ? ' bg-green-800 border border-green-100  text-white px-1 py-1 rounded-full hover:bg-green-700 text-xs flex items-center' : 'border border-green-500  text-green-500 px-1 py-1 rounded-full hover:bg-green-100 text-xs flex items-center';

    return (
        <div>
            <div className="max-w-3xl mx-auto flex space-x-4">
                <button onClick={handleGoodClick} className={beenGoodClasses + ""}>


                    Good Signal
                </button>
                <button onClick={handleNeutralClick} className={neutraledIconColor + ""}>


                    Neutral Signal
                </button>
                <button onClick={handleBadClick} className={dislikeIconColor + ""}>


                    Bad Signal
                </button>
            </div>
        </div>
    );
}

export default GoodBadButtons;
