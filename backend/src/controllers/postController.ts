import {Request, Response, NextFunction } from 'express';
const Post = require('../models/post');
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
  res.json({
    "allPosts": allPosts,
  });
});
