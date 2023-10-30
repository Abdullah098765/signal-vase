import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js'; // Assuming this imports your Mongoose model
import connectDB from '../db.js';

connectDB();

export async function POST(req, res) {
    try {
        // Assuming you receive the FCM token and user ID in the request body
        const { fcmToken, userId } = await req.json();

        console.log(fcmToken, userId);
        // Update the user's notification preferences
        const user = await Schemas.User.findById(userId);

        if (!user) {
            // User not found
            return new NextResponse({ status: 404, body: 'User not found' });
        }

        // Update FCM token and set inApp to true
        user.notificationPreferences.fcmToken = fcmToken;
        user.notificationPreferences.inApp = true;

        // Save the updated user
        await user.save();

        return new NextResponse({ status: 200, body: 'FCM token saved successfully' });
    } catch (error) {
        console.error(error);
        return new NextResponse({ status: 500, body: 'Internal Server Error' });
    }
}
