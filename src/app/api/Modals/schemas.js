// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  photoURL: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fireBaseUid: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default { User }
