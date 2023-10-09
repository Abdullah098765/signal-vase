const mongoose = require('mongoose');
// const models = require('mongoose/models');
import { models } from "mongoose";

const userSchema = new mongoose.Schema({

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
    // Add any other user information fields you need.
  },
  location: {
    type: String,
    // Add the user's location if necessary.
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  signalsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // If you have a Signal schema.
    },
  ],
  SuccessfulSignals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // Reference to the Signal schema.
    },
  ],
  UnsuccessfulSignals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Signal', // Reference to the Signal schema.
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review', // If you have a Review schema.
    },
  ],
  notificationPreferences: {
    email: {
      type: Boolean,
      default: true,
    },
    inApp: {
      type: Boolean,
      default: true,
    },
  },
  accountStatus: {
    type: String,
    enum: ['active', 'disabled', 'suspended'],
    default: 'active',
  },
  registrationDate: {
    type: Date,
    default: Date.now,
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
    enum: ['Crypto', 'Stock'], // You can expand this enum as needed
  },

  // Duration of the signal
  duration: {
    type: String,
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
    type: Boolean,
    default: false,
  },

  // Comments on the signal
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },
      text: {
        type: String,
        required: true,
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
  followersCount: {
    type: Number,
    default: 0,
  },

  // Other properties specific to your project
});

// Create the Signal model
const Signal = models.Signal || mongoose.model('Signal', signalSchema);

const User = models.User || mongoose.model('User', userSchema);
export default { User, Signal }
