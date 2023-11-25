import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';

export function addNeutral(signalId, userId, setNeutraledCount, neutraledCount) {
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
    fetch("https://signal-hub.vercel.app/api/neutral-count", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    setNeutraledCount && setNeutraledCount(neutraledCount + 1);
    return "Neutral counted"
}
export function addGood(signalId, userId, setNeutraledCount, neutraledCount) {
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
    fetch("https://signal-hub.vercel.app/api/good-count", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    setNeutraledCount && setNeutraledCount(neutraledCount + 1);
    return "Good counted"

}
const GoodBadButtons = ({ signal }) => {
    const [neutraled, setNeutraled] = useState(false);
    const [beenBad, setBeenBad] = useState(false);
    const [beenGood, setBeenGood] = useState(false);
    const [neutraledCount, setNeutraledCount] = useState(signal.likes.length);
    const [beenBadCount, setBeenBadCount] = useState(signal.disLikesCount.length);
    const { user, selectedSignal, setSelectedSignal, isSignalModalOpen, setisSignalModalOpen, getSignals } = useMyContext();
    const [following, setFollowing] = useState(false);


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
        fetch("https://signal-hub.vercel.app/api/good-discount", requestOptions)
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
        fetch("https://signal-hub.vercel.app/api/bad-discount", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        setBeenBadCount(beenBad ? beenBadCount - 1 : beenBadCount);
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
        fetch("https://signal-hub.vercel.app/api/neutral-discount", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
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
        fetch("https://signal-hub.vercel.app/api/bad-count", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        setBeenBadCount(beenBadCount + 1);
    }


    const handleGoodClick = () => {

        if (!beenGood) {
            addGood(signal._id, user._id, setNeutraledCount, neutraledCount)
            if (beenBad) {

                badDiscount()

            }
            if (neutraled) {

                neutralDiscount()

            }
        }
        else {
            goodDiscount()
        }
        setBeenGood(!beenGood);
        setBeenBad(false);
        setNeutraled(false);
    }
    const handleNeutralClick = () => {
        if (!neutraled) {
            addNeutral(signal._id, user._id, setNeutraledCount, neutraledCount)
            if (beenBad) {

                badDiscount()

            }
            if (beenGood) {

                goodDiscount()

            }
        }
        else {
            neutralDiscount()
        }
        setNeutraled(!neutraled);
        setBeenBad(false);
        setBeenGood(false);
    };

    const handleBadClick = () => {
        if (!beenBad) {
            badCount()
            if (neutraled) {

                neutralDiscount()

            }
            if (beenGood) {

                goodDiscount()

            }
        }
        else {
            badDiscount()

        }
        setBeenBad(!beenBad);
        setNeutraled(false);
        setBeenGood(false);
    };


    useEffect(() => {


        if (signal.good.indexOf(user._id) !== -1) {
            setBeenGood(true)
        }
        if (signal.neutral.indexOf(user._id) !== -1) {
            setNeutraled(true)
        }
        if (signal.bad.indexOf(user._id) !== -1) {
            setBeenBad(true)
        }

    }, [])
    const neutraledIconColor = neutraled ? 'bg-blue-800 border border-blue-100 text-white px-1 py-1 rounded-full hover:bg-blue-700 text-xs flex items-center' : 'border border-blue-500 text-blue-500 px-1 py-1 rounded-full hover:bg-blue-100 text-xs flex items-center';
    const dislikeIconColor = beenBad ? ' bg-red-800 border border-red-100  text-white px-1 py-1 rounded-full hover:bg-red-700 text-xs flex items-center' : 'border border-red-500  text-red-500 px-1 py-1 rounded-full hover:bg-red-100 text-xs flex items-center';
    const beenGoodClasses = beenGood ? ' bg-green-800 border border-green-100  text-white px-1 py-1 rounded-full hover:bg-green-700 text-xs flex items-center' : 'border border-green-500  text-green-500 px-1 py-1 rounded-full hover:bg-green-100 text-xs flex items-center';

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
