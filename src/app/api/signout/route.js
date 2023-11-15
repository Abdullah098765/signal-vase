import { NextResponse } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

export async function POST(req, res) {
    try {
        // Parse the request body
        const uid = await req.json();
        console.log(uid.uid);

        // Find the user by uid and update inApp to false
        const updatedUser = await Schemas.User.findOneAndUpdate(
            { fireBaseUid: uid.uid },
            { $set: { 'notificationPreferences.inApp': false } },
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            // Return the updated user data as JSON
            return NextResponse.json(updatedUser);
        } else {
            // User not found, return an appropriate response
            return NextResponse.json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
