import { NextResponse, NextRequest } from "next/server";
import Schemas from "../Modals/schemas.js";
import connectDB from "../db.js";

connectDB();

export async function POST(req, res) {
  try {
    // Parse the request body
    const { search, filter, skip } = await req.json();

    // Ensure that search is provided
    if (!search) {
      return NextResponse.status(400).json({
        error: "Bad Request - Search parameter is required"
      });
    }

    // Connect to MongoDB

    // Use regex to perform case-insensitive search on both Users and Signals
    const usersResult = await Schemas.User.find({
      $or: [
        { displayName: { $regex: new RegExp(search, "i") } },
        { bio: { $regex: new RegExp(search, "i") } },
        { about: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
        { market: { $regex: new RegExp(search, "i") } }
      ]
    });
    const signalsResult = await Schemas.Signal.find({
      $or: [
        { pair: { $regex: new RegExp(search, "i") } },
        { explanation: { $regex: new RegExp(search, "i") } },
        { cryptoOrStock: { $regex: new RegExp(search, "i") } },
        { longOrShort: { $regex: new RegExp(search, "i") } },
        { status: { $regex: new RegExp(search, "i") } }
      ]
    }).populate('signalProvider').skip(skip)
      .limit(8);

    // Apply additional filtering if filter object is provided
    // Example: { status: 'active' }
    if (filter) {
      // Apply filter to Users collection
      if (usersResult.length > 0) {
        // usersResult = usersResult.filter(user => /* Apply filter conditions */);
      }

      // Apply filter to Signals collection
      if (signalsResult.length > 0) {
        // signalsResult = signalsResult.filter(signal => /* Apply filter conditions */);
      }
    }

    const results = {
      users: usersResult,
      signals: signalsResult
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error searching in MongoDB:", error);
    return NextResponse.status(500).json({ error: "Internal Server Error" });
  }
}
