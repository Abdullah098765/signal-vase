import { NextResponse, NextRequest } from "next/server";
import Schemas from "../Modals/schemas.js";
import connectDB from "../db.js";
import {
  updateSuccess,
  updateUsersSignalStatus
} from "../check-Success/check-success.js";
import schemas from "../Modals/schemas.js";

connectDB();

export async function POST(req, res) {
  try {
    const { skip } = await req.json();

    // Find the user by uid
    // const signals = await Schemas.Signal.find().populate({ path: 'signalProvider', model: Schemas.User })
    const pipeline = [
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "signalProvider",
          foreignField: "_id",
          as: "signalProvider"
        }
      },
      {
        $unwind: {
          path: "$signalProvider",
          preserveNullAndEmptyArrays: true
        }
      },
      // Match only active signals
      {
        $match: {
          // status: 'Expired',
        }
      },
      // Add fields for follower count, likes count, and comments count
      {
        $addFields: {
          followerCount: { $size: "$followers" },
          likesCount: { $size: "$likes" },
          commentsCount: { $size: "$comments" }
        }
      },
      // Sort by various criteria
      {
        $sort: {
          status: 1, // Sort by status in ascending order (Activated first)
          followerCount: -1, // Sort by followers in descending order
          likesCount: -1, // Then by likes in descending order
          commentsCount: -1, // Then by comments in descending order
          "signalProvider.reviews": -1 // Then by signal provider's reviews count in descending order
        }
      },
      // Project the desired fields
      {
        $project: {
          signalProvider: 1, // Include the signal provider object
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
          comments: 1
        }
      },

      { $skip: skip },
      { $limit: 23}
    ];

    // Perform the aggregation
    const signals = await Schemas.Signal.aggregate(pipeline, {
      maxTimeMS: 60000
    });
    const cacheControlHeader = "no-cache, no-store"; // You can adjust max-age as needed
    // const num = await Schemas.Num.find().skip(skip).limit(10);
    if (signals) {
      return new Response(JSON.stringify(signals), {
        headers: {
          "Cache-Control": cacheControlHeader,
          "Content-Type": "application/json"
        }
      });
    } else {
      // User not found, return an appropriate response
      return new Response(JSON.stringify({ error: "signals not found" }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 404 // Use the appropriate status code
      });
    }
  } catch (error) {
    console.error("Error finding signalsr:", error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 500 // Use the appropriate status code
    });
  }
}
