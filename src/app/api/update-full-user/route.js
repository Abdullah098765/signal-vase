import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

export async function PUT(req, res) {
    try {
        // Parse the request body
        const user = await req.json();
        // const { displayName, profilePicture, bio, about, uid, market } = userData;
        console.log(user);
        // You may want to validate the incoming data here

        // Assuming you have a function like `updateUser` to update user data
        const updatedUser = await Schemas.User.findByIdAndUpdate(user._id, user, { new: true });

        if (updatedUser) {
            return NextResponse.json(updatedUser);
        } else {
            return NextResponse.json({ error: 'User not found' });
        }

    } catch (error) {
        console.error('Error updating user:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
