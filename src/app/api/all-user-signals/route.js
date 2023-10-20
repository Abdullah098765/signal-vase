import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';

connectDB();

export async function POST(req, res) {
  try {
    const userId = await req.json();
    const uid = userId.uid;


    // Perform the aggregation
    const user = await Schemas.User.findOne({ _id: uid });

    if (user) {
      // Use the populate method to fetch the actual Signal documents
      const goodSignals = await Schemas.Signal.find({ _id: { $in: user.goodSignals } });
      const badSignals = await Schemas.Signal.find({ _id: { $in: user.badSignals } });
      const neutralSignals = await Schemas.Signal.find({ _id: { $in: user.neutralSignals } });
      const activeSignals = await Schemas.Signal.find({ _id: { $in: user.activeSignals } });

      // Create an object with the populated arrays
      const categorizedSignals = {
        goodSignals, 
        badSignals,
        neutralSignals,
        activeSignals,
      };

      return NextResponse.json(categorizedSignals);
    } else {
      // User not found, return an appropriate response
      return NextResponse.json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error finding signals:', error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
