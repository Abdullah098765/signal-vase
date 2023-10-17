
import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';

// Connect to the database
connectDB();

export async function POST(req, res) {
    try {
        // Parse the request body
        const _signalId = await req.json();
        var signalId = _signalId.signalId;
        var badCounterId = _signalId.badCounterId;
        console.log(signalId);

        // Use await to wait for the findOneAndUpdate to complete
        var signal = await Schemas.Signal.findByIdAndUpdate(signalId, {
            $addToSet: { bad: badCounterId },
          });

        if (signal) {
            // Return the updated signal data as JSON
            return NextResponse.json(signal);
        } else {
            // Signal not found, return an appropriate response
            return NextResponse.json({ error: 'Signal not found' });
        }
    } catch (error) {
        console.error('Error finding signal:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
