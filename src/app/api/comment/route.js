import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

async function sendNotification(signalId, commentData) {
    try {
        const response = await fetch('https://signal-hub.vercel.app/comment-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commentData, signalId }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

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
        sendNotification(signalId, commentData)
        return NextResponse.json({ message: 'Comment added successfully', updatedSignal });
    } catch (error) {
        console.error('Error saving Comment:', error);

        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
