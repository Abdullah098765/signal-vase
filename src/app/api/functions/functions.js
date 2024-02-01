// import mongoose from "mongoose";
// const cron = require('node-cron');
// import Schemas from '../Modals/schemas.js'
// import { updateSuccess, updateUsersSignalStatus } from "../check-Success/check-success.js";
// import signal_Expirations from '../signals-expiration/expiration.js'
// import schemas from "../Modals/schemas.js";

// export function setupChangeStream() {
//     console.log("stream is on!");
//     const changeStream = Schemas.Signal.watch();
//     changeStream.on('change', async (change) => {
//         console.log("Some thing changing in Signal collection!", change);
//         if (change.operationType === 'update') {
//             const updatedSignal = await Schemas.Signal.findById(change.documentKey._id);
//             await updateSuccess();
//             await updateUsersSignalStatus();
//             await signal_Expirations();
//             await pushRandomNumber();
//             if (updatedSignal.status === 'Expired') {
//                 console.log("function LINE 20: ",updatedSignal);
//                 await handleExpiredSignal(updatedSignal);

//             }
//         }
//     });

//     changeStream.on('error', (error) => {
//         console.error('Change stream error:', error);
//     });
// };



// const sendExpirationNotifications = async (signalId) => {

//     const postData = {
//         signalId: signalId,
//         // other data you want to send in the request body
//     };

//     try {
//         const response = await fetch('http://localhost:3000/api/expiration-notification', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // Add any other headers if needed
//             },
//             body: JSON.stringify(postData),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }

// }

// async function handleExpiredSignal(signal) {
//     if (!signal.expirationNotificationSent) {
//         // Set the expirationNotificationSent flag to true
//         await Schemas.Signal.findByIdAndUpdate(signal._id, {
//             $set: { expirationNotificationSent: true },
//         });

//         // Call sendExpirationNotifications only once
//         sendExpirationNotifications(signal._id);
//         console.log('request sending');
//     }

// }
// // Function to push a random number
// export const pushRandomNumber = async () => {
//     // Generate a random number
//     const randomNumber = Math.floor(Math.random() * 100); // You can adjust the range as needed

//     try {
//         // Create a new document with the random number
//         const newDocument = new schemas.Num({ num: randomNumber });

//         // Save the new document
//         await newDocument.save();

//         console.log(`Random number ${randomNumber} added successfully.`);
//     } catch (error) {
//         console.error('Error adding random number:', error.message);
//     }
// };

// export const cornInterval = () => {
//     cron.schedule('*/15 * * * * *', () => {
//         updateSuccess();
//         updateUsersSignalStatus();
//         signal_Expirations();
//         pushRandomNumber()
//         console.log("cronInterval every 15 seconds!");
//     });
// }
