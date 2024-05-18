import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const Post = require('../models/post');

router.get('/', async function(req:Request, res:Response, next:NextFunction) {
  const recentPosts = await Post.find().sort({postDate: -1}).limit(3).exec();
  const recentPostsJson = JSON.stringify(recentPosts);
  res.json({
    "title": "Blog",
    "recentposts": recentPostsJson,
  });
});

module.exports = router;
