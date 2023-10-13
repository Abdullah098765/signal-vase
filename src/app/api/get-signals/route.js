import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function GET(req, res) {
  try {


    // Find the user by uid
    // const signals = await Schemas.Signal.find().populate({ path: 'signalProvider', model: Schemas.User })
    const pipeline = [
      {
        $lookup: {
          from: 'users', // The name of the User collection
          localField: 'signalProvider',
          foreignField: '_id',
          as: 'signalProvider',
        },
      },
      {
        $unwind: {
          path: '$signalProvider',
          preserveNullAndEmptyArrays: true,
        },
      },
      // Match only active signals
      {
        $match: {
          // status: 'Expired',
        },
      },
      // Add fields for follower count, likes count, and comments count
      {
        $addFields: {
          followerCount: { $size: '$followers' },
          likesCount: { $size: '$likes' },
          commentsCount: { $size: '$comments' },
        },
      },
      // Sort by various criteria
      {
        $sort: {
          status: 1,  // Sort by status in ascending order (Activated first)
          followerCount: -1, // Sort by followers in descending order
          likesCount: -1,    // Then by likes in descending order
          commentsCount: -1, // Then by comments in descending order
          'signalProvider.reviews': -1, // Then by signal provider's reviews count in descending order
        },
      },
      // Project the desired fields
      {
        $project: {
          signalProvider: 1,  // Include the signal provider object
          cryptoOrStock: 1,
          duration: 1,
          entry1: 1,
          entry2: 1,
          explanation: 1,
          longOrShort: 1,
          status: 1,
          pair: 1,
          stopLoss: 1,
          takeProfit1: 1,
          takeProfit2: 1,
          takeProfit3: 1,
          isSuccess: 1,
          likes: 1,
          disLikesCount: 1,
          followers: 1,
          createdAt: 1,
          comments: 1,
        },
      },
    ];

    // Perform the aggregation
    const signals = await Schemas.Signal.aggregate(pipeline, { maxTimeMS: 60000 })


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