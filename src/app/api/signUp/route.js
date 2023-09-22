import { NextResponse, NextRequest } from 'next/server'
import connectDB from '../db.js';
import Schemas from '../Modals/schemas.js'

connectDB();




export async function POST(req, res) {
  var user = await req.json()

  const newUser = new Schemas.User(
    user
  );
  console.log(user);
  // Save the user to the database
  newUser.save()
    .then(() => {
      console.log('User saved to the database');
      
    })
    .catch((error) => {
      console.error('Error saving user:', error);
    });
  // var user = await req.json()
  // console.log( "New User Is Logged in ", user);
  return NextResponse.json({ a: "user.displayName +' Successfully logged in'" })
}




