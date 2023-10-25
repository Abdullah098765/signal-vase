import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

// Connect to the database
connectDB();

export async function POST(req, res) {
  try {
    // Parse the request body
    const requestData = await req.json();
    const { userId, targetUserId, action } = requestData;
    console.log(userId, targetUserId, action);

    // Check if the target user exists
    const targetUser = await Schemas.User.findById(targetUserId);

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' });
    }

    // Handle subscription/unsubscription based on the action
    if (action === 'subscribe') {
      // Check if the user is not already subscribed
      if (!targetUser.Subscribers.includes(userId)) {
        targetUser.Subscribers.push(userId); // Add the user to the target's subscribers
        targetUser.save(); // Save changes in targetUser's Subscribers array
      }
      
      // Also, add targetUserId to userId's Subscribed array
      const user = await Schemas.User.findById(userId);
      if (user) {
        if (!user.Subscribed.includes(targetUserId)) {
          user.Subscribed.push(targetUserId); // Add the target user to the user's subscribed list
          user.save(); // Save changes in user's Subscribed array
        }
      }
    } else if (action === 'unsubscribe') {
      // Remove the user from the target's subscribers
      const index = targetUser.Subscribers.indexOf(userId);
      if (index > -1) {
        targetUser.Subscribers.splice(index, 1);
        targetUser.save(); // Save changes in targetUser's Subscribers array
      }

      // Also, remove targetUserId from userId's Subscribed array
      const user = await Schemas.User.findById(userId);
      if (user) {
        const userIndex = user.Subscribed.indexOf(targetUserId);
        if (userIndex > -1) {
          user.Subscribed.splice(userIndex, 1); // Remove the target user from the user's subscribed list
          user.save(); // Save changes in user's Subscribed array
        }
      }
    } else {
      return NextResponse.json({ error: 'Invalid action' });
    }

    // Return a success response
    return NextResponse.json({ message: `Subscription ${action}d successfully` });
  } catch (error) {
    console.error('Error handling subscription:', error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
