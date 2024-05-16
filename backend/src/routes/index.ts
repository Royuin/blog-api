import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const Post = require('../models/post');

router.get('/', async function(req:Request, res:Response, next:NextFunction) {
  const posts = await Post.find();
  const postsJson = JSON.stringify(posts);
  res.json({
    "title": "Blog",
    "posts": postsJson,
  });
});

module.exports = router;
