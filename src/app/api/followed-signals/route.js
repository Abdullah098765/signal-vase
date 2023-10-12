import { NextResponse } from 'next/server';
import Schemas from '../Modals/schemas'; // Import your schemas
import connectDB from '../db'; // Import your database connection

connectDB();

export async function POST(req, res) {

  const userId = await req.json();


  console.log('here is iD ', userId.userId);

  try {
    // Now, you can use the user's ID to filter signals
    const followedSignals = await Schemas.Signal.find({ followers: userId.userId }).populate({ path: 'signalProvider', model: Schemas.User })

    return NextResponse.json(followedSignals);
  } catch (error) {
    console.error('Error fetching followed signals:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
