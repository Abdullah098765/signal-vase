import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

export async function PUT(req, res) {
    try {
        // Parse the request body
        const userData = await req.json();
        const { displayName, profilePicture, bio, about, uid, market } = userData;
        console.log(userData);
        // You may want to validate the incoming data here

        // Assuming you have a function like `updateUser` to update user data
        const updatedUser = await Schemas.User.findByIdAndUpdate(uid, {
            displayName,
            profilePicture,
            bio,
            about,
            market
        }, { new: true });

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
