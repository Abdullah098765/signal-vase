// db.js

import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sabir:LNnrcPrsOnfuTMEa@atlascluster.rimv5ng.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
