// import { updateSuccess, updateUsersSignalStatus } from '../check-Success/check-success.js';
// import connectDB from '../db.js';  // Import your database connection module
// import { NextResponse } from 'next/server.js';  // Import your NextResponse module
// import signal_Expirations from '../signals-expiration/expiration.js'
// import {pushRandomNumber} from '../functions/functions.js'
// import schemas from '../Modals/schemas.js';

// export async function GET(req, res) {
//   try {
//      connectDB();  // Assuming connectDB returns a promise or is an asynchronous function

//     // Your existing code
    
//    await updateSuccess();
//    await  updateUsersSignalStatus();
//    await signal_Expirations();
//    await  pushRandomNumber();

//     return NextResponse.json('server');
//   } catch (error) {
//     console.error('Error in GET function:', error);
//     return NextResponse.error(500, 'Internal Server Error');
//   }
// }
