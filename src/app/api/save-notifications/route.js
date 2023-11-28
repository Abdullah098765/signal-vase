import { NextResponse, NextRequest } from 'next/server';
import connectDB from '../db.js';
import Schemas from '../Modals/schemas.js';

connectDB();

export async function POST(req, res) {
  try {
    const notificationData = await req.json();
    // Save the notification to the database
    const newNotification = new Schemas.Notification(notificationData);
    const savedNotification = await newNotification.save();

    console.log('Notification saved to the database', savedNotification);

    // Send a JSON response with a 200 status code (OK)
    return NextResponse.json(savedNotification);
  } catch (error) {
    console.error('Error saving notification:', error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'An error occurred while saving the notification' }, { status: 500 });
  }
}
