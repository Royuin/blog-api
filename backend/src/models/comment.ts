export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const CommentSchema = new Schema ({
  author: { type: User.Types.ObjectId, required: true },
  content: { type: String, required: true },
  postDate: { type: Date, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
