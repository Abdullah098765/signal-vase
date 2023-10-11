import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function POST(req, res) {
    try {
        // Parse the request body
        const sid = await req.json()
        console.log(sid.sid);

        // Find the user by uid
        const signal = await Schemas.Signal.findOne({ _id: sid.sid }).maxTime(30002);

        if (signal) {
            // Return the user data as JSON
            return NextResponse.json(signal);
        } else {
            // User not found, return an appropriate response
            return NextResponse.json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error finding user:', error);

        // Send a JSON response with a 500 status code (Internal Server Error)
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
