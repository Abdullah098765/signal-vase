import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

// Connect to the database
connectDB();

export async function POST(req, res) {
  try {
    // Parse the request body
    const { signalId, followerId } = await req.json();
    console.log(signalId);

    // Use await to wait for the findOneAndUpdate to complete
    const signal = await Schemas.Signal.findByIdAndUpdate(
      signalId,
      {
        $addToSet: { followers: followerId },
      },
      { new: true } // To get the updated document
    );

    if (signal) {
      // Return the updated signal data as JSON
      return NextResponse.json(signal);
    } else {
      // Signal not found, return an appropriate response
      return NextResponse.json({ error: 'Signal not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error adding follower:', error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
