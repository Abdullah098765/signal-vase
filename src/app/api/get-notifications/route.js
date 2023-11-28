import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function POST(req, res) {

    try {
        // Parse the request body
        const data = await req.json();
        const userId = data.userId
        console.log(userId);

        // Find notifications where the userId matches any receiverId in the receiverIds array
        const notifications = await Schemas.Notification.find({ receiverIds: userId });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Error finding notifications:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}



