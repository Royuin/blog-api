import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('passport');

router.get('/post/:id', postController.getPost);

router.get('/posts/', postController.allPosts); 

router.get('/user/posts/:id', postController.userPosts);

router.get('/posts/create', passport.authenticate('jwt', {failureRedirect: '/'}));
router.post('/posts/create', passport.authenticate('jwt', {failureRedirect: '/'}), postController.createPost);

router.get('/post/:id/update', passport.authenticate('jwt', {failureRedirect: '/'}), postController.getPostUpdate);
router.post('/post/:id/update', passport.authenticate('jwt', {failureRedirect: '/'}), postController.updatePost);

module.exports = router;
