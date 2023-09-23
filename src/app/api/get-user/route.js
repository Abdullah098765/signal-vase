import { NextResponse, NextRequest } from 'next/server'
import Schemas from '../Modals/schemas.js'





export async function GET(req, res) {
//   try {
//     const uid = await req.json();

//    const user = await Schemas.User.findOne({fireBaseUid:uid})
//     return NextResponse.json(user);
//   } catch (error) {
//     console.error('Error finding user:', error);
    
//     // Send a JSON response with a 500 status code (Internal Server Error)
//     return NextResponse.json({ error: 'An error occurred while finding the user' }, { status: 500 });
//   }
  return NextResponse.json({ error: 'An error occurred while finding the user' });

}





