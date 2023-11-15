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

        // Retrieve subscribers' FCM tokens from the signal provider's followers
        const signalProvider = await models.User.findById(signalProviderId)
        const subscribersFCMTokens = signalProvider.SubscribersFCMTokens
        console.log(subscribersFCMTokens);


        // Send notifications to subscribers
        const notificationPayload = {
            title: 'New Signal Posted!',
            body: `Signal: ${signal.cryptoOrStock} ${signal.pair}`,
        };

        if (subscribersFCMTokens.length > 0) {
            const responses = await admin.messaging().sendMulticast({
                tokens: subscribersFCMTokens,
                notification: {
                    title: notificationPayload.title,
                    body: notificationPayload.body,
                    // Add the URL you want to open on notification click
                },
                data: {
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/signal-hub-eb98f.appspot.com/o/profile-pictures%2F6541e74d50b66088ed303492%2FPhotoRoom-20230928_024430.png?alt=media&token=92554d0a-79cb-488f-a426-2ec9f7d27904',  // Add the URL of your image
                    iconUrl: 'https://signal-hub.vercel.app/_next/static/media/logo.20d2465c.svg',       // Add the URL of your icon
                    clickAction: '/signal/' + signalId,
                },
            });
            responses.responses.forEach((response, index) => {
                if (!response.success) {
                    console.error(`Error sending notification to token ${subscribersFCMTokens[index]}:`, response.error);
                }
            });
            console.log('Successfully sent notifications:', responses);
            return NextResponse.json({ success: true, responses });
        } else {
            return NextResponse.json({ success: false, message: 'No subscribers to notify' });
        }

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
