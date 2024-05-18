import {Request, Response, NextFunction } from 'express';
const User = require('../models/user');
const Post = require('../models/post');

exports.getUser = ( async (req:Request, res:Response, next:NextFunction) => {
  const user = await User.findById(req.params.id);
  const posts = await Post.find({'_id': { $in: user.posts }}).exec();
  res.json({
    user,
    posts
  });
});
