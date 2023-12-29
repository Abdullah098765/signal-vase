// pages/api/savePersonalInfo.js

import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

connectDB();

export async function PUT(req, res) {
      try {
            // Parse the request body to get personalInformation data
            const {userId, personalInformation } = await req.json();

            // You may want to validate the incoming data here

            // Assuming you have a function like `savePersonalInfoData` to save personalInformation data
            // Here you would typically create a new document in your MongoDB collection
            // Replace 'YourModelName' with the actual model name for personalInformation in your schemas.js file
            const updatedUser = await Schemas.User.findByIdAndUpdate(
                  userId,
                  { personalInfo: personalInformation },
                  { new: true } // Return the updated document
            );
            if (updatedUser) {
                  // Return the saved personalInformation data as JSON
                  return NextResponse.json(updatedUser);
            } else {
                  // Failed to save, return an appropriate response
                  return NextResponse.json({ error: 'Failed to save personalInformation' });
            }
      } catch (error) {
            console.error('Error saving personalInformation:', error);

            // Send a JSON response with a 500 status code (Internal Server Error)
            return NextResponse.json({ error: 'Internal Server Error' });
      }
}
