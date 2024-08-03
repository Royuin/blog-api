import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');
const { cookieJwtAuth } = require('../utils/tokenUtils');

router.get('/post/:id', postController.getPost);

router.get('/posts/', postController.allPosts); 

router.get('/user/posts/:id', postController.userPosts);

router.get('/posts/create', cookieJwtAuth);
router.post('/posts/create', cookieJwtAuth, postController.createPost);

router.get('/post/:id/update', cookieJwtAuth, postController.getPostUpdate);

module.exports = router;
