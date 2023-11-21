import { NextResponse } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

export async function PUT(req, res) {
    try {
        const Data = await req.json();
        const { reviewData, providerId } = Data;

        // Assuming signalId is provided in the request and reviewData follows the structure you specified

        // Update the signal with the new review
        const updatedSignal = await Schemas.User.findOneAndUpdate(
            { _id: providerId },
            { $push: { reviews: reviewData } },
            { new: true }
        );

        return NextResponse.json({ message: 'Review added successfully', updatedSignal });
    } catch (error) {
        console.error('Error saving Review:', error);

        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
