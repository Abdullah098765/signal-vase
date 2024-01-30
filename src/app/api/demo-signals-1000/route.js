import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';
import mongoose from 'mongoose';

connectDB();

export async function GET(req, res) {
  try {
    // ... (Previous code remains unchanged)

    // Assuming user is defined somewhere and it has the user's ObjectID as a string
    const userIdString = "658aa18418e027cedd91178b";

    // Convert the user's ObjectID from string to ObjectID
    const userId = new mongoose.Types.ObjectId(userIdString);
    const pairs = ['BTC/USD', 'ETH/USD', 'XRP/USD', /* Add more pairs as needed */];
    const explanations = ['Demo explanation 1', 'Demo explanation 2', /* Add more explanations as needed */];
    const markets = ['crypto', 'stock', /* Add more markets as needed */];
    const durations = [8000000000000000, 8000000000000000, 8000000000000000, /* Add more durations as needed */];
    const longShortOptions = ['Long', 'Short'];
    // Create 1000 random signals
    // for (let i = 0; i < 1000; i++) {
    //   const pair = getRandomValue(pairs) + i;
    //   const explanation = getRandomValue(explanations);
    //   const entry1 = getRandomEntry();
    //   const entry2 = getRandomEntry();
    //   const takeProfit1 = getRandomEntry();
    //   const takeProfit2 = getRandomEntry();
    //   const takeProfit3 = getRandomEntry();
    //   const stopLoss = getRandomEntry();
    //   const market = getRandomValue(markets);
    //   const duration = getRandomValue(durations);
    //   const longShort = getRandomValue(longShortOptions);
    //   const signalData = {
    //     pair,
    //     explanation,
    //     entry1,
    //     entry2,
    //     takeProfit1,
    //     takeProfit2,
    //     takeProfit3,
    //     stopLoss,
    //     cryptoOrStock: market,
    //     duration,
    //     longOrShort: longShort,
    //     signalProvider: userId, // Use the ObjectID here
    //     status: 'Active'
    //   };

    //   const newsignal = new Schemas.Signal(signalData);
    //   // Save the signal to the database
    //   await newsignal.save();
    //   console.log(i + '/1000');
    // }

    // Send a JSON response with a 200 status code (OK)
    return NextResponse.json({ message: 'Demo signals created successfully' });
  } catch (error) {
    console.error('Error creating demo signals:', error);
    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'An error occurred while creating demo signals' }, { status: 500 });
  }
}

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get a random entry value (you may adjust this based on your application logic)
function getRandomEntry() {
  return Math.round(Math.random() * 100); // Adjust as needed for your application
}