import mongoose from "mongoose";
const cron = require('node-cron');
import Schemas from '../Modals/schemas.js'
// import { updateSuccess, updateUsersSignalStatus } from "../check-Success/check-success.js";

export function setupChangeStream() {
    console.log("stream is on!");
    const changeStream = Schemas.Signal.watch();
    changeStream.on('change', async (change) => {
        if (change.operationType === 'update') {
            const updatedSignal = await Schemas.Signal.findById(change.documentKey._id);

            if (updatedSignal.status === 'Expired') {
                console.log(updatedSignal);
                await handleExpiredSignal(updatedSignal);
            }
        }
    });

    changeStream.on('error', (error) => {
        console.error('Change stream error:', error);
    });
};



const sendExpirationNotifications = async (signalId) => {

    const postData = {
        signalId: signalId,
        // other data you want to send in the request body
    };

    try {
        const response = await fetch('http://localhost:3000/api/expiration-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }

}
async function handleExpiredSignal(signal) {
    if (!signal.expirationNotificationSent) {
        // Set the expirationNotificationSent flag to true
        await Schemas.Signal.findByIdAndUpdate(signal._id, {
            $set: { expirationNotificationSent: true },
        });

        // Call sendExpirationNotifications only once
        sendExpirationNotifications(signal._id);
        console.log('request sending');
    }

}

export const cornInterval = () => {
    cron.schedule('* * * * *', () => {
      
        console.log("cornInterval on a minute!");
    });
}