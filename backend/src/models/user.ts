export {};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Post = require('./post');

const UserSchema = new Schema ({
  username: { required: true, type: String, minLength: 3}, 
  password: { required: true, type: String, minLength: 4},
  posts: { type: [Post], default: undefined},
  isAuthor: { required: true, default: false },
});

module.exports = mongoose.model('User', UserSchema);
