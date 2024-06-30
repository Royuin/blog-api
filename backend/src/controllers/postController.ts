import {Request, Response, NextFunction } from 'express';
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
import { query, validationResult } from 'express-validator';
import passport from 'passport';
const { verifyToken } = require('../utils/tokenUtils');

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

exports.createPost = [
  query('title', 'Title must not be empty.').trim().notEmpty().escape(),
  query('content', 'Content must not be empty and be at least 50 characters long.').trim().isLength({min: 50}).escape(),
  query('isPublic').escape(), 

  async (req:Request, res:Response, next:NextFunction) => {
    
  verifyToken();
  },
]

