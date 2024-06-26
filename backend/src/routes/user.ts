import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), userController.loginPost);

router.get('/users', userController.allUsers);

router.get('/user/:id', userController.getUser);

module.exports = router;
