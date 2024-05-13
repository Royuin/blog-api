export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Comment = require('./comment');

const PostSchema = new Schema ({
  title: { required: true, minLength: 3, type: String },
  content: { required: true, type: String },
  author: { required: true, type: User.Types.ObjectId },
  postDate: { required: true, type: Date },
  comments: { type: [Comment], default: undefined },
  isPublic: { required: true, type: Boolean },
});

module.exports = mongoose.model('Post', PostSchema);
