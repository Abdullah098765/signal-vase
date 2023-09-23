import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function POST(req, res) {
    try {
        // Parse the request body
        const uid = await req.json()
        console.log(uid.uid);

        // Find the user by uid
        const user = await Schemas.User.findOne({ fireBaseUid: uid.uid }).maxTime(30002);

        if (user) {
            // Return the user data as JSON
            return NextResponse.json(user);
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
