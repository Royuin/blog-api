import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const Post = require('../models/post');

router.get('/post/:id', async (req:Request, res:Response, next:NextFunction) => {
  const post = await Post.findById(req.params.id);
  res.json({
    "post": post,
  });
});

module.exports = router;
