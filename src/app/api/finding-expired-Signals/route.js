import { NextResponse, NextRequest } from "next/server";
import Schemas from "../Modals/schemas.js";
import connectDB from "../db.js";
import {
  updateSuccess,
  updateUsersSignalStatus,
} from "../check-Success/check-success.js";
import schemas from "../Modals/schemas.js";
const admin = require("firebase-admin");

// Check if the Firebase app is already initialized
if (!admin.apps.length) {
  // Initialize Firebase Admin with service account credentials
  const serviceAccount = require("../../../../signal-hub-eb98f-firebase-adminsdk-nvfwh-48f27d1860.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const buttons = [
  {
    title: 'Good Signal',
    action: 'goodSignal',
  },
  {
    title: 'Neutral Signal',
    action: 'neutralSignal',
  },
  {
    title: 'Bad Signal',
    action: 'badSignal',
  },
];
connectDB();

export async function POST(req, res) {
  try {
    // const { skip } = await req.json();


    const currentTimeInMillis = new Date().getTime();

    // const notificationDataFromExpiredSignals = await schemas.Signal.aggregate([
    //   {
    //     $match: {
    //       duration: { $lt: currentTimeInMillis },
    //       expirationNotificationSent: false
    //     }
    //   },
    //   {
    //     $unwind: '$followers'
    //   },
    //   {
    //     $lookup: {
    //       from: 'users', // Replace with the actual name of your followers collection
    //       localField: 'followers',
    //       foreignField: '_id',
    //       as: 'followerData'
    //     }
    //   },
    //   {
    //     $unwind: '$followerData'
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       pair: 1,
    //       cryptoOrStock: 1,
    //       'follower._id': '$followerData._id',
    //       'follower.notificationPreferences': '$followerData.notificationPreferences'
    //     }
    //   }
    // ]);

    const signals = await schemas.Signal.find({
      duration: { $lt: currentTimeInMillis },
      expirationNotificationSent: false,
      $expr: { $gt: [{ $size: "$followers" }, 0] }
    }).populate({
      path: 'followers',
      select: 'notificationPreferences _id'
    });


    if (signals) {

      var followersIds = []
      var followersFCMTokens = []
      for (let i = 0; i < signals.length; i++) {
        const signal = signals[i];
        for (let j = 0; j < signal.followers.length; j++) {
          const follower = signal.followers[j];
          followersIds.push(follower._id)
          if (follower.notificationPreferences.inApp) {
            followersFCMTokens.push(follower.notificationPreferences.fcmToken)
          }

        }
        console.log("followersIds: ", followersIds);
        console.log("followersFCMTokens: ", followersFCMTokens);
        const buttonsData = buttons.map(button => ({
          title: button.title,
          action: button.action,
        }));

        const message = {
          tokens: followersFCMTokens,
          notification: {
            title: 'Signal Expiration',
            body: `The signal for ${signal.cryptoOrStock} ${signal.pair} has expired.`,
          },
          data: {
            clickAction: `/signal/${signal._id}/`, // Note: You might need to adjust this part if followerId is not accessible here
            buttons: JSON.stringify(buttonsData),
            receiverId: JSON.stringify(followersIds),
          },
        };

        var savedNotification = await saveNotificationData(message)
        var notificationSending = await pushNotification(message)
        return new Response(JSON.stringify({ notificationSending, savedNotification }));

      }

      return new Response(JSON.stringify(signals));


    } else {
      // signals not found, return an appropriate response
      return new Response(JSON.stringify({ error: "signals not found" }));
    }
  } catch (error) {
    console.error("Error finding signalsr:", error);

    // Send a JSON response with a 500 status code (Internal Server Error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }));
  }
}


const saveNotificationData = async (message) => {
  const notificationData = {
    title: message.notification.title,
    body: message.notification.body,
    clickAction: message.data.clickAction,
    actions: buttons,
    receiverIds: JSON.parse(message.data.receiverId)
  };

  try {
    // Save the notification to the database
    const newNotification = new Schemas.Notification(notificationData);
    const savedNotification = await newNotification.save();

    console.log('Notification saved to the database', savedNotification);
    // You can perform additional logic here if needed
    await Schemas.Signal.updateOne(
      { _id: message.data.clickAction.split('/')[2] }, // Assuming the signal is within the savedNotification object
      { $set: { expirationNotificationSent: true } }
    );
    return savedNotification;
  } catch (error) {
    console.error('Error saving notification:', error);
    throw new Error('An error occurred while saving the notification');
  }
}


const pushNotification = async (message) => {



  try {
    const response = await admin.messaging().sendMulticast(message);

    if (response.successCount > 0) {
      console.log(`${response.successCount} messages were sent successfully.`);

      return `${response.successCount} messages were sent successfully.`
    }

    if (response.failureCount > 0) {
      console.error(`${response.failureCount} messages failed to send.`);
      response.responses.forEach((resp, index) => {
        if (!resp.success) {
          console.error(`Error sending notification to token ${followersWithInAppTokens[index]}:`, resp.error);
          return `Error sending notification to token ${followersWithInAppTokens[index]}:`, resp.error
        }
      });
    }
  } catch (error) {
    console.error('Error sending multicast notification:', error);
  }
}