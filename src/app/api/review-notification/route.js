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
        const { reviewData, providerId } = await req.json();

        // Retrieve the signal information from the database
        const provider = await models.User.findById(providerId)


        if (!provider) {
            return NextResponse.json({ error: 'provider not found' });
        }
        saveNotificationData(reviewData.rDisplayName, `Review on your profile ` + reviewData.text, reviewData.rProfilePicture, '/profile?review=true', String(providerId))


        // Retrieve the signal provider information

        if (provider.notificationPreferences.inApp) {
            // Send notification to the specific signal provider
            const notificationPayload = {
                title: reviewData.rDisplayName,
                body: `Review on your profile ` + reviewData.text,
            };

            const response = await admin.messaging().send({
                token: provider.notificationPreferences.fcmToken,
                notification: {
                    title: notificationPayload.title,
                    body: notificationPayload.body,
                },
                data: {
                    clickAction: '/profile?review=true',
                    iconUrl: reviewData.rProfilePicture,
                    receiverId: providerId

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


const saveNotificationData = async (title, body, iconUrl, clickAction, receiverId) => {


    const notificationData = {
        title,
        body,
        iconUrl,
        clickAction,
        receiverIds: [receiverId]
    };

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