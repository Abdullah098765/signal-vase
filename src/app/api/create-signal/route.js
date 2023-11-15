
import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';
import mongoose from 'mongoose';



connectDB()




export async function POST(req, res) {
  try {
    const signalData = await req.json();
    console.log(signalData);

    const newsignal = new Schemas.Signal(
      signalData
    );
    console.log(signalData);
    // Save the signal to the database
    var _signal = await newsignal.save();
    console.log('signal saved to the database', _signal);
    await notifySubscribersAboutNewSignal(_signal);

    // Send a JSON response with a 200 status code (OK)
    return NextResponse.json(_signal);
  } catch (error) {
    console.error('Error saving signal:', error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'An error occurred while saving the signal' }, { status: 500 });
  }
}

const notifySubscribersAboutNewSignal = async (signalData) => {
  try {
    // Make an HTTP request to your notification API
    const notificationApiUrl = 'https://signal-hub.vercel.app/api/new-signal-notification';
    const payload = {
      signalId: signalData._id,
      signalProviderId: signalData.signalProvider._id,
    };

    await fetch(notificationApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error notifying subscribers:', error);
    // Handle error appropriately
    throw error;
  }
};

