import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function GET(req, res) {
    try {
       

        // Find the user by uid
        const signals = await Schemas.Signal.find().populate({ path: 'signalProvider', model: Schemas.User })

        if (signals) {
             
            return NextResponse.json(signals);
        } else {
            // User not found, return an appropriate response
            return NextResponse.json({ error: 'signals not found' });
        }
    } catch (error) {
        console.error('Error finding signalsr:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
