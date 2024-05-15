export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');
const Comment = require('./comment');
const ObjectId = mongoose;

const PostSchema = new Schema ({
  title: { required: true, minLength: 3, type: String },
  content: { required: true, type: String },
  author: { required: true, type: Schema.Types.ObjectId, ref: 'User'},
  postDate: { required: true, type: Date },
  comments: { type: Array },
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', PostSchema);
