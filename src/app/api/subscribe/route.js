import { NextResponse, NextRequest } from 'next/server';
import Schemas from '../Modals/schemas.js';
import connectDB from '../db.js';

// Connect to the database
connectDB();

export async function POST(req, res) {
  try {
    // Parse the request body
    const requestData = await req.json();
    const { userId, targetUserId, action, userFcm } = requestData;
    console.log(userId, targetUserId, action, userFcm);

    // Check if the target user exists
    const targetUser = await Schemas.User.findById(targetUserId);

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' });
    }

    // Handle subscription/unsubscription based on the action
 // ... (other code)

if (action === 'subscribe') {
  if (!targetUser.Subscribers.includes(userId)) {
      targetUser.Subscribers.push(userId);

      if (userFcm) {
          targetUser.SubscribersFCMTokens.push(userFcm);
      }
      await targetUser.save(); // Use await to ensure the save operation completes before proceeding
  }

  const user = await Schemas.User.findById(userId);
  if (user && !user.Subscribed.includes(targetUserId)) {
      user.Subscribed.push(targetUserId);
      await user.save(); // Use await to ensure the save operation completes before proceeding
  }
} else if (action === 'unsubscribe') {
  const index = targetUser.Subscribers.indexOf(userId);
  if (index > -1) {
      targetUser.Subscribers.splice(index, 1);
      await targetUser.save(); // Use await to ensure the save operation completes before proceeding
  }

  if (userFcm) {
      const index1 = targetUser.SubscribersFCMTokens.indexOf(userFcm);
      if (index1 > -1) {
          targetUser.SubscribersFCMTokens.splice(index1, 1);
          await targetUser.save(); // Use await to ensure the save operation completes before proceeding
      }
  }

  const user = await Schemas.User.findById(userId);
  if (user) {
      const userIndex = user.Subscribed.indexOf(targetUserId);
      if (userIndex > -1) {
          user.Subscribed.splice(userIndex, 1);
          await user.save(); // Use await to ensure the save operation completes before proceeding
      }
  }
}
    
    else {
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
