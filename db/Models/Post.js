const mongoose = require('mongoose');
const { Schema } = require('../db');

const PostSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: { type: String },
  likes: {
    type: Number,
    default: 0,
  },
  // comments: [{ id: String, body: String, userId: String, postId: String }],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
      userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
