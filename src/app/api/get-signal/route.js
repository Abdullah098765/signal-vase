import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function POST(req, res) {
    try {
        // Parse the request body
        const signalId = await req.json()
        console.log(signalId.signalId);

        // Find the signal by uid
        const signal = await Schemas.Signal.findOne({ _id: signalId.signalId }).populate('signalProvider').maxTime(30002);

        if (signal) {
            // The 'signalProvider' field will be populated with user data
            return NextResponse.json(signal);
        } else {
            // signal not found, return an appropriate response
            return NextResponse.json({ error: 'signal not found' });
        }
    } catch (error) {
        console.error('Error finding signal:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
