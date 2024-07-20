import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');
const { cookieJwtAuth } = require('../utils/tokenUtils');

router.get('/post/:id', postController.getPost);

router.get('/posts/', postController.allPosts); 

router.get('/user/posts/:id', postController.userPosts);

router.get('/posts/create', cookieJwtAuth, postController.createPostGet);
router.post('/posts/create', postController.createPost);

module.exports = router;
