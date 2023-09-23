const mongoose = require('mongoose');

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



const User = mongoose.model('User', userSchema);
export default { User }
