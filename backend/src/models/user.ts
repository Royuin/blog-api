export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Post = require('./post');
const ObjectId = mongoose;

const UserSchema = new Schema ({
  username: { required: true, type: String, minLength: 3}, 
  password: { required: true, type: String, minLength: 4},
  posts: { type: Array },
  isAuthor: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
