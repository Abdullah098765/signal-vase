const mongoose = require('mongoose');
// const models = require('mongoose/models');
import { models } from "mongoose";

const numSchema = new mongoose.Schema({
  num:
  {
    type: Number,
  },

})

const userSchema = new mongoose.Schema({
  personalInfo: {
    // The personalInfo field containing the specified structure
    fullName: String,
    age: String,
    socialMediaLinks: [
      {
        title: String,
        link: String
      }
    ],
    mobile: String,
    email: String,
    market: String,
    languages: String,
    country: String
  },
  displayName: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fireBaseUid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fIdHash: {
    type: String,
  },
  password: {
    type: String,
    // required: true,
    // You may want to add more validation or use a password hashing library.
  },
  profilePicture: {
    type: String,
    // You can store the URL to the user's profile picture.
  },
  bio: {
    type: String,
    default: 'Passionate about trading cryptocurrencies and stocks.'
    // Add any other user information fields you need.
  },
  about: {
    type: String,
    default: '...'
    // Add any other user information fields you need.
  },
  location: {
    type: String,
    // Add the user's location if necessary.
  },
  Subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  SubscribersFCMTokens: [
    {
      type: String,
      default: null
    },
  ],
  Subscribed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  expiredSignals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  activeSignals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  signalsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // If you have a Signal schema.
    },
  ],
  goodSignals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // Reference to the Signal schema.
    },
  ],
  badSignals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // Reference to the Signal schema.
    },
  ],
  neutralSignals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // Reference to the Signal schema.
    },
  ],
  activeSignals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // Reference to the Signal schema.
    },
  ],
  reviews: [
    {
      rFireBaseUid: {
        type: String,
        // required: true,
      },
      rProfilePicture: {
        type: String,
        // required: true,
      },
      rDisplayName: {
        type: String,
        // required: true,
      },
      text: {
        type: String,
        // required: true,
      },
      image: {
        type: String, // Assuming you want to store the URL of the image
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  notificationPreferences: {
    fcmToken: {
      type: String, // Assuming FCM tokens are strings
      default: null, // Set to null by default to indicate no FCM token initially
    },
    inApp: {
      type: Boolean,
      default: false,
    },
  },
  accountStatus: {
    type: String,
    enum: ['active', 'disabled', 'suspended'],
    default: 'active',
  },
  market: {
    type: String,
    default: 'Crypto/Forex',
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const signalSchema = new mongoose.Schema({
  // User who provided the signal (signal provider)
  signalProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },

  // Type of asset (crypto or stock)
  cryptoOrStock: {
    type: String,
    required: true,
  },

  // Duration of the signal
  duration: {
    type: Number,
    required: true,
  },

  // Entry points
  entry1: {
    type: Number,
    required: true,
  },
  entry2: {
    type: Number,
  },

  // Signal explanation
  explanation: {
    type: String,
    required: true,
  },

  // Long or Short signal
  longOrShort: {
    type: String,
    required: true,
    enum: ['Long', 'Short'],
  },
  status: {
    type: String,
    default: "Active",
    enum: ['Active', 'Expired'],
  },
  expirationNotificationSent: {
    type: Boolean,
    default: false,
  },

  // Trading pair (e.g., BTC/USDT)
  pair: {
    type: String,
    required: true,
  },

  // Stop loss and take profit levels
  stopLoss: {
    type: Number,
    required: true,
  },
  takeProfit1: {
    type: Number,
    required: true,
  },
  takeProfit2: {
    type: Number,
  },
  takeProfit3: {
    type: Number,
  },

  // Date and time when the signal was created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Success status of the signal (true if successful, false if failed)
  isSuccess: {
    type: String,
    default: 'null',
  },

  // Comments on the signal
  comments: [
    {
      cFireBaseUid: {
        type: String,
        // required: true,
      },
      cProfilePicture: {
        type: String,
        // required: true,
      },
      cDisplayName: {
        type: String,
        // required: true,
      },
      text: {
        type: String,
        // required: true,
      },
      image: {
        type: String, // Assuming you want to store the URL of the image
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // Users who liked the signal
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  disLikesCount: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  // Users who follow the signal provider

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  good: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  bad: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  neutral: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],


  // Other properties specific to your project
});

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  iconUrl: {
    type: String,
  },
  receiverIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clickAction: {
    type: String,

  },
  actions: [
    {
      action: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
});
// Create the Signal model
const Signal = models.Signal || mongoose.model('Signal', signalSchema);
const User = models.User || mongoose.model('User', userSchema);
const Notification = models.Notification || mongoose.model('Notification', notificationSchema);
const Num = models.Num || mongoose.model('Num', numSchema);

export default { User, Signal, Notification, Num };

