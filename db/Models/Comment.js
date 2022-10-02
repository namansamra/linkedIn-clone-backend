const mongoose = require('mongoose');
const { Schema } = require('../db');

const CommentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
