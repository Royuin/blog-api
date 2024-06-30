import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/post/:id', postController.getPost);

router.get('/posts/', postController.allPosts); 

router.get('/user/posts/:id', postController.userPosts);

router.get('/posts/create', postController.createPostGet);
router.post('/posts/create', postController.createPost);

module.exports = router;
