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
        const { signalId } = await req.json();

        // Retrieve the signal information from the database
        const signal = await models.Signal.findById(signalId).populate('followers', 'notificationPreferences');

        if (!signal) {
            return NextResponse.json({ error: 'Signal not found' });
        }

        const followersFCMTokens = signal.followers
            .filter(follower => follower.notificationPreferences?.inApp)
            .map(follower => follower.notificationPreferences.fcmToken)
            .filter(fcmToken => typeof fcmToken === 'string' && fcmToken.trim() !== '');

        if (followersFCMTokens.length > 0) {
            // Send notifications to followers
            const notificationPayload = {
                title: 'Signal Expiration',
                body: `The signal for ${signal.cryptoOrStock} ${signal.pair} has expired.`,
            };

            const buttons = [
                {
                    title: 'Good Signal',
                    action: 'goodSignal',
                },
                {
                    title: 'Neutral Signal',
                    action: 'neutralSignal',
                },
                {
                    title: 'Bad Signal',
                    action: '/signal/' + signalId + '/feedback/bad',
                },
            ];

            const buttonsData = buttons.map(button => ({
                title: button.title,
                action: button.action,
            }));

            const responses = await admin.messaging().sendMulticast({
                tokens: followersFCMTokens,
                notification: {
                    title: notificationPayload.title,
                    body: notificationPayload.body,
                },
                data: {
                    clickAction: '/signal/' + signalId,
                    imageUrl: 'https://example.com/signal-expiration-image.jpg',
                    iconUrl: 'https://example.com/signal-expiration-icon.jpg',
                    buttons: JSON.stringify(buttonsData),
                },
            });

            responses.responses.forEach((response, index) => {
                if (!response.success) {
                    console.error(`Error sending notification to token ${followersFCMTokens[index]}:`, response.error);
                }
            });

            return NextResponse.json({ success: true, responses });
        } else {
            return NextResponse.json({ success: false, message: 'No followers with in-app notification preferences to notify' });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
