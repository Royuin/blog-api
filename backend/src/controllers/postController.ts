import {Request, Response, NextFunction } from 'express';
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getPost = ( async (req:Request, res:Response, next:NextFunction) => {
  const post = await Post.findById(req.params.id);
  const commentsIds = post.comments;
  const comments = await Comment.find({'_id': {$in: commentsIds}}).exec(); 
  res.json({
    post,
    comments
  });
});

exports.allPosts = ( async (req:Request, res:Response, next:NextFunction) => {
  const allPosts = await Post.find();
  res.json({
    "allPosts": allPosts,
  });
});
