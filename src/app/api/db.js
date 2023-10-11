// db.js

import mongoose from 'mongoose';
import signal_Expirations from './signals-expiration/expiration.js'


// mongodb+srv://sabir:LNnrcPrsOnfuTMEa@atlascluster.rimv5ng.mongodb.net/?retryWrites=true&w=majority
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sabir:LNnrcPrsOnfuTMEa@atlascluster.rimv5ng.mongodb.net/test?retryWrites=true&w=majority&ssl=true', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
  signal_Expirations()

};

export default connectDB;
