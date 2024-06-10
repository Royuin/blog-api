import {Request, Response, NextFunction } from 'express';
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.getPost = ( async (req:Request, res:Response, next:NextFunction) => {
  const post = await Post.findById(req.params.id).exec();
  const comments = await Comment.find({'_id': {$in: post.comments}}).exec(); 
  res.json({
    post,
    comments
  });
});

exports.allPosts = ( async (req:Request, res:Response, next:NextFunction) => {
  const allPosts = await Post.find().exec();
  console.log(allPosts);
  res.json({
    "allPosts": allPosts,
  });
});

exports.userPosts = ( async (req:Request, res:Response, next:NextFunction) => {
  const user = await User.findById(req.params.id).exec();
  const userPosts = await Post.find({author: user}).exec();

  res.json({
    userPosts,
    user
  });
});
