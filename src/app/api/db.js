// db.js

import mongoose from 'mongoose';
import schemas from './Modals/schemas.js';

const updatedPersonalInfo = {
  fullName: "Abdullah Sabir",
  age: "24 Jul, 1991",
  socialMediaLinks: [
    {
      title: "Facebook",
      link: "https://chat.openai.com/c/0d1aab1a-89df-4e29-975a-77abd73b66c2"
    },
    {
      title: "JAD",
      link: "https://chat.openai.com/c/0d1aab1a-89df-4e29-975a-77abd73b66c2"
    }
  ],
  mobile: "+923142991434",
  email: "ssmmhazz@gmail.com",
  market: "stock",
  languages: "urdu",
  country: "Pakistan"
};


// mongodb+srv://sabir:LNnrcPrsOnfuTMEa@atlascluster.rimv5ng.mongodb.net/?retryWrites=true&w=majority
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sabir:LNnrcPrsOnfuTMEa@atlascluster.rimv5ng.mongodb.net/test?retryWrites=true&w=majority&ssl=true', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
   schemas.User.updateMany({}, { $set: { personalInfo: updatedPersonalInfo } }).then((err, result) => {
    if (err) {
      console.error("Error updating documents:", err);
    } else {
      console.log("Successfully updated documents:", result);
    }
  })
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

};

export default connectDB;
