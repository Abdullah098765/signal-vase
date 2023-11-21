import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

export async function PUT(req, res) {
    try {
        const Data = await req.json();
        const { commentData, signalId } = Data;

        // Assuming signalId is provided in the request and commentData follows the structure you specified

        // Update the signal with the new comment
        const updatedSignal = await Schemas.Signal.findOneAndUpdate(
            { _id: signalId },
            { $push: { comments: commentData } },
            { new: true }
        );

        return NextResponse.json({ message: 'Comment added successfully', updatedSignal });
    } catch (error) {
        console.error('Error saving Comment:', error);

        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
