#!/usr/bin/env node

import { Sign, pbkdf2 } from "crypto";
import { Aggregate, AnyExpression, ObjectId, VirtualPathFunctions } from "mongoose";

console.log('This script will populate the database with any users, posts, and or comments given.');

const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('../models/post');
const Comment = require('./models/comment');
const express = require('express');
// const mongoose = require('mongoose');
const ObjectId = 'mongoose';

const err = express;

const userArgs = process.argv.slice(2);

interface user {
  _id: ObjectId,
  username: string,
  password: string,
  posts: ObjectId[],
  isAuthor: boolean,
};

interface post {
  _id: ObjectId,
  title: string,
  content: string,
  author: ObjectId,
  postDate: string,
  comments: ObjectId[],
};

interface comment {
  _id: ObjectId,
  author: ObjectId,
  content: string,
  postDate: string,
};

const users:user[] = [];
const posts:post[] = [];
const comments:comment[] = [];

mongoose.set('strictQuery', false);


main().catch((err) => console.log(err));

async function main() {
  console.log('About to connect');
  await mongoose.connect(process.env.DB_URL);
  console.log('Connected');
  await createUsers();
  await createPosts();
  await createComments();
  console.log('Disconnecting');
  mongoose.connection.close();
  console.log('You have been disconnected');
}

async function userCreation(index:number, username:string, password:string, posts:ObjectId[], isAuthor:boolean) {
  const newUser = new User({username, password, posts, isAuthor});
  await newUser.save();
  users[index] = newUser;
  
  console.log(`Creating user: ${username}`);
};

async function postCreation(index:number, title:string, content:string, author:ObjectId, postDate:string, comments:ObjectId[], isPublic:boolean) {
  const newPost = new Post({title, content, author, postDate, comments, isPublic});
  await newPost.save();
  posts[index] = newPost;
  console.log(`Adding post: ${title}`);
};

async function commentCreation(index:number, author:ObjectId, content:string, postDate:string) {
  const newComment = new Comment({author, content, postDate});
  await newComment.save();
  comments[index] = newComment;
  console.log(`Adding comment: ${content}`);
};
