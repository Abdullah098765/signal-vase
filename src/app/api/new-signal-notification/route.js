import { NextResponse } from 'next/server';
import connectDB from '../db.js';
import { models } from "mongoose";
const admin = require("firebase-admin");

// Check if the Firebase app is already initialized
if (!admin.apps.length) {
    // Initialize Firebase Admin with service account credentials
    const serviceAccount = require("../../../../signal-hub-eb98f-firebase-adminsdk-nvfwh-48f27d1860.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

connectDB();

export async function POST(req, res) {
    try {
        const { signalId, signalProviderId } = await req.json();

        // Retrieve the signal information from the database
        const signal = await models.Signal.findById(signalId).populate('signalProvider');

        if (!signal) {
            return NextResponse.json({ error: 'Signal not found' });
        }

        const signalProvider = await models.User.findById(signal.signalProvider._id).populate({
            path: 'Subscribers',
            select: 'notificationPreferences _id',
        })
        if (signalProvider.Subscribers && signalProvider.Subscribers.length > 0) {

            // const subscribersFCMTokens = signalProvider.Subscribers
            //     .map(subscriber => subscriber.notificationPreferences?.fcmToken)
            //     .filter(fcmToken => typeof fcmToken === 'string' && fcmToken.trim() !== '');

            // console.log(subscribersFCMTokens);

            //later
            const subscribersFCMTokens = []
            const subscribersIds = []
            signalProvider.Subscribers
                .map(subscriber => {
                    subscribersIds.push(subscriber._id)
                    if (subscriber.notificationPreferences.inApp) {
                        subscribersFCMTokens.push(subscriber.notificationPreferences.fcmToken)
                    }
                })
            console.log(signalProvider.Subscribers);
            console.log(subscribersIds);


            // Send notifications to subscribers
            const notificationPayload = {
                title: signalProvider.displayName,
                body: `Posted new signal for : ${signal.cryptoOrStock} ${signal.pair}`,
            };

            saveNotificationData(notificationPayload.title, notificationPayload.body, 'imageUrl', signalProvider.profilePicture, '/signal/' + signalId, subscribersIds)

            if (subscribersFCMTokens.length > 0) {
                const responses = await admin.messaging().sendMulticast({
                    tokens: subscribersFCMTokens,
                    notification: {
                        title: notificationPayload.title,
                        body: notificationPayload.body,
                        // Add the URL you want to open on notification click
                    },
                    data: {
                        imageUrl: "https://scontent.fkhi16-2.fna.fbcdn.net/v/t39.30808-6/402249571_888252269374154_4972497221506926378_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Emds1Tv4v38AX_Ojxcz&_nc_ht=scontent.fkhi16-2.fna&oh=00_AfAMweISCW8mhCm-PQTYuiAkMQl5h0o-DUps9djPKcP5BA&oe=65593852",
                        iconUrl: signalProvider.profilePicture,
                        // iconUrl: 'https://scontent.fkhi16-2.fna.fbcdn.net/v/t39.30808-6/402249571_888252269374154_4972497221506926378_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Emds1Tv4v38AX_Ojxcz&_nc_ht=scontent.fkhi16-2.fna&oh=00_AfAMweISCW8mhCm-PQTYuiAkMQl5h0o-DUps9djPKcP5BA&oe=65593852',       // Add the URL of your icon
                        clickAction: '/signal/' + signalId,
                    },
                });
                responses.responses.forEach((response, index) => {
                    if (!response.success) {
                        console.error(`Error sending notification to token ${subscribersFCMTokens[index]}:`, response.error);
                    }
                });
                // console.log('Successfully sent notifications:', responses);
                return NextResponse.json({ success: true, responses });

            }
            else {
                return NextResponse.json({ success: false, message: 'No subscribers to notify' });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

const saveNotificationData = async (title, body, imageUrl, iconUrl, clickAction, receiverIds) => {


    const notificationData = {
        title,
        body,
        imageUrl,
        iconUrl,
        clickAction,
        receiverIds: receiverIds
    };
    console.log(receiverIds);
    try {
        const response = await fetch('https://signal-hub.vercel.app/api/save-notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notificationData),
        });

        if (response.ok) {
            console.log('Notification data sent successfully');
        } else {
            console.error('Failed to send notification data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error sending notification data:', error);
    }
}