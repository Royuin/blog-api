import {Request, Response, NextFunction } from 'express';
const User = require('../models/user');
const Post = require('../models/post');

exports.allUsers = ( async (req:Request, res:Response, next:NextFunction) => {
  const allUsers = await User.find().exec();
  res.json({
    allUsers
  });
});

exports.getUser = ( async (req:Request, res:Response, next:NextFunction) => {
  const user = await User.findById(req.params.id).exec();
  const posts = await Post.find({'_id': { $in: user.posts }}).exec();
  res.json({
    user,
    posts
  });
});
