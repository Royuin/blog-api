import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const postController = require('../controllers/postController');

router.get('/post/:id', postController.getPost);

router.get('/posts/', postController.allPosts); 

module.exports = router;
