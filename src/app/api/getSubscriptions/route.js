import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function POST(req, res) {

    try {
        // Parse the request body
        const data = await req.json();
        const subscriberId = data.subscriberId
        console.log(subscriberId);

        // Find Subscription where the userId matches any receiverId in the receiverIds array
        const Subscription = await Schemas.User.find({ Subscribers: subscriberId });

        return NextResponse.json(Subscription);
    } catch (error) {
        console.error('Error finding Subscription:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}



