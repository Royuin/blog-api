import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const Post = require('../models/post');

router.get('/post/:id', async (req:Request, res:Response, next:NextFunction) => {
  const post = await Post.findById(req.params.id);
  res.json({
    post
  });
});

router.get('/posts/', async (req:Request, res:Response, next:NextFunction) => {
  const allPosts = await Post.find();
  res.json({
    allPosts
  });
});

module.exports = router;
