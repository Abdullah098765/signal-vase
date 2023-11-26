import { NextResponse } from 'next/server';
import connectDB from '../db.js';
import { models } from 'mongoose';
const admin = require('firebase-admin');

// Check if the Firebase app is already initialized
if (!admin.apps.length) {
    // Initialize Firebase Admin with service account credentials
    const serviceAccount = require('../../../../signal-hub-eb98f-firebase-adminsdk-nvfwh-48f27d1860.json');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

connectDB();

export async function POST(req, res) {
    try {
        const { signalId, commentData } = await req.json();

        // Retrieve the signal information from the database
        const signal = await models.Signal.findById(signalId)
            .populate({
                path: 'signalProvider',
                select: 'notificationPreferences profilePicture',
            })
            .exec();

        if (!signal) {
            return NextResponse.json({ error: 'Signal not found' });
        }

        // Retrieve the signal provider information
        const signalProvider = signal.signalProvider;

        if (signalProvider.notificationPreferences.inApp && (signalProvider.profilePicture !== commentData.cProfilePicture)) {
            // Send notification to the specific signal provider
            const notificationPayload = {
                title: commentData.cDisplayName,
                body: `Commented on your signal for: ${signal.cryptoOrStock} ${signal.pair}`,
            };

            const response = await admin.messaging().send({
                token: signalProvider.notificationPreferences.fcmToken,
                notification: {
                    title: notificationPayload.title,
                    body: notificationPayload.body,
                },
                data: {
                    clickAction: '/signal/' + signalId,
                    iconUrl: commentData.cProfilePicture,
                    receiverId:''
                },


            });

            if (!response.success) {
                // console.error(`Error sending notification to token ${signalProvider.notificationPreferences.fcmToken}:`, response.error);
                return NextResponse.json({ success: false, message: 'Error sending notification', response });
            }

            return NextResponse.json({ success: true, response });

        } else {
            return NextResponse.json({ success: false, message: 'Notification preferences not enabled for this user' });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
