
import { NextResponse, NextRequest } from 'next/server';
import connectDB from '../db.js';
import Schemas from '../Modals/schemas.js';

connectDB();

export async function POST(req, res) {
  try {
    const user = await req.json();
    const newUser = new Schemas.User(user);
    console.log(user);
    // Save the user to the database
    var _user = await newUser.save();

    console.log('User saved to the database', _user);
    // Send a JSON response with a 200 status code (OK)
    return NextResponse.json(_user);
  } catch (error) {
    console.error('Error saving user:', error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'An error occurred while saving the user' }, { status: 500 });
  }
}





