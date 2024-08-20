import {Request, Response, NextFunction } from 'express';
const User = require('../models/user');
const Post = require('../models/post');
import { query, validationResult, body } from 'express-validator';
const genPassword = require('../utils/passwordUtils');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const verifytoken = require('../utils/tokenUtils');
const bcrypt = require('bcrypt');

exports.signupPost = [
  query('username', 'Username must not be empty and must be at least 3 characters.').trim().notEmpty().isLength({min: 3, max: 20}).escape(),
  query('password', 'Password must not be empty and must be at least 4 characters.').trim().notEmpty().isLength({min: 4, max: 20}).escape(),

  async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    const userExists = await User.findOne({username: req.query.username});

    if (!errors.isEmpty()) {
      res.json({
        errors
      });
      return;
    } else if (userExists) {
      res.json({
        userExists,
      });
      return;
    } else {
      const hashedPassword = genPassword(req.query.password);
      const newUser = new User(req.query.username, hashedPassword, [], req.query.isAuthor);
      await newUser.save();

      res.redirect('/');
    };
  },
];

exports.loginPost =  ( async (req:Request, res:Response, next:NextFunction) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) { 
    return res.status(401).send ({
      success: false,
      message: 'User does not exist',
    });
  }

  const validation = await bcrypt.compare(req.body.password, user.password);

  if (!validation) {
    return res.status(401).send ({
      success: false,
      message: 'Password is incorrect',
      })
  }

  if (user) {
    // Add token expiration probably about 30mins
    const token = jwt.sign({user}, process.env.JWT_SECRET);
    return res.status(200).send({
      success: true,
      message: 'You have been logged in.',
      token: `Bearer ${token}`
    })
  }
});

exports.allUsers = ( async (req:Request, res:Response, next:NextFunction) => {
  const allUsers = await User.find().exec();
  res.json({
    allUsers
  });
});

exports.getUser = ( async (req:Request, res:Response, next:NextFunction) => {
  const user = await User.findById(req.params.id).exec();
  const posts = await Post.find({'_id': { $in: user.posts }}).exec();
  res.json({
    user,
    posts
  });
});
