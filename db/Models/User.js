const mongoose = require('mongoose');
const { Schema } = require('../db');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  password: String,
  avatar: String,
  company: String,
  position: String,
  about: String,
  access_token: String,
  otherInfoFilled: { type: Boolean, default: false },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  likedPosts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
