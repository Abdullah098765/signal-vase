import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'
import connectDB from '../db.js';



connectDB()




export async function GET(req, res) {
      console.log("Corn Job is Running!");

      try {
            console.log("Corn Job is Running!");
            return NextResponse.json({ msg: "Corn Job is Running!" });


      } catch (error) {
            console.error('Error:', error);

            // Send a JSON response with a 500 status code (Internal Server Error)
            return NextResponse.json({ error: 'Internal Server Error' });
      }
}
