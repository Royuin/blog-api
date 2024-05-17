import {Request, Response, NextFunction } from 'express';
const Post = require('../models/post');

exports.getPost( async (req:Request, res:Response, next:NextFunction) => {
  const post = await Post.findById(req.params.productId);
  res.json({
    "post": post,
  });
});
