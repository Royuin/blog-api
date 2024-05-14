#!/usr/bin/env node

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

async function createUsers() {
  console.log('Creating users');
  await Promise.all([
    userCreation(0,
      'John',
      'password1',
      [posts[0]._id, posts[1]._id],
      true
    ),
    userCreation(1,
      'Sally',
      'password2',
      [posts[2]._id],
      false
    ),
    userCreation(2,
      'Billy',
      'password3',
      [posts[3]._id],
      false
    ),
  ]);
};

async function createPosts() {
  console.log('Creating Posts');
  await Promise.all ([
    postCreation(0,
       'John Test Post 1',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget lectus tristique, hendrerit dolor sed, scelerisque nibh. In hac habitasse platea dictumst. Morbi imperdiet, velit non blandit gravida, dolor felis consequat ante, ut molestie nisl ligula nec enim. Sed erat lacus, vehicula et iaculis eget, vestibulum fermentum sapien. Vestibulum eget euismod odio, sed venenatis velit. Duis sed odio non neque faucibus varius. Cras imperdiet aliquet placerat. Proin accumsan lacus neque, nec lobortis ex rhoncus vel. Praesent ut lacus cursus, dictum justo ac, pretium orci. Nulla facilisi. Fusce sed turpis bibendum, vulputate libero id, tristique dui. Mauris rhoncus feugiat suscipit. Praesent sed malesuada magna. In cursus turpis risus, eget volutpat risus pellentesque ut. Nunc eu iaculis mauris, ac sollicitudin nisl. Suspendisse et viverra eros, efficitur iaculis quam. Proin hendrerit, dolor ac pulvinar placerat, odio leo porta mi, tempor feugiat nibh nisi eget turpis. Morbi vel ullamcorper nisl. Sed bibendum, lorem ac commodo vulputate, lacus purus semper massa, quis facilisis elit augue a lacus. Pellentesque pellentesque at enim in tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eleifend venenatis turpis sit amet commodo. ',
      users[0]._id,
      Date(),
      [comments[0]._id, comments[1]._id],
      true,
  ),
    postCreation(1,
       'John Test Post 2',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget lectus tristique, hendrerit dolor sed, scelerisque nibh. In hac habitasse platea dictumst. Morbi imperdiet, velit non blandit gravida, dolor felis consequat ante, ut molestie nisl ligula nec enim. Sed erat lacus, vehicula et iaculis eget, vestibulum fermentum sapien. Vestibulum eget euismod odio, sed venenatis velit. Duis sed odio non neque faucibus varius. Cras imperdiet aliquet placerat. Proin accumsan lacus neque, nec lobortis ex rhoncus vel. Praesent ut lacus cursus, dictum justo ac, pretium orci. Nulla facilisi. Fusce sed turpis bibendum, vulputate libero id, tristique dui. Mauris rhoncus feugiat suscipit. Praesent sed malesuada magna. In cursus turpis risus, eget volutpat risus pellentesque ut. Nunc eu iaculis mauris, ac sollicitudin nisl. Suspendisse et viverra eros, efficitur iaculis quam. Proin hendrerit, dolor ac pulvinar placerat, odio leo porta mi, tempor feugiat nibh nisi eget turpis. Morbi vel ullamcorper nisl. Sed bibendum, lorem ac commodo vulputate, lacus purus semper massa, quis facilisis elit augue a lacus. Pellentesque pellentesque at enim in tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eleifend venenatis turpis sit amet commodo. ',
      users[1]._id,
      Date(),
      [],
      true,
  ),
    postCreation(0,
       'Sally Test Post 1',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget lectus tristique, hendrerit dolor sed, scelerisque nibh. In hac habitasse platea dictumst. Morbi imperdiet, velit non blandit gravida, dolor felis consequat ante, ut molestie nisl ligula nec enim. Sed erat lacus, vehicula et iaculis eget, vestibulum fermentum sapien. Vestibulum eget euismod odio, sed venenatis velit. Duis sed odio non neque faucibus varius. Cras imperdiet aliquet placerat. Proin accumsan lacus neque, nec lobortis ex rhoncus vel. Praesent ut lacus cursus, dictum justo ac, pretium orci. Nulla facilisi. Fusce sed turpis bibendum, vulputate libero id, tristique dui. Mauris rhoncus feugiat suscipit. Praesent sed malesuada magna. In cursus turpis risus, eget volutpat risus pellentesque ut. Nunc eu iaculis mauris, ac sollicitudin nisl. Suspendisse et viverra eros, efficitur iaculis quam. Proin hendrerit, dolor ac pulvinar placerat, odio leo porta mi, tempor feugiat nibh nisi eget turpis. Morbi vel ullamcorper nisl. Sed bibendum, lorem ac commodo vulputate, lacus purus semper massa, quis facilisis elit augue a lacus. Pellentesque pellentesque at enim in tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eleifend venenatis turpis sit amet commodo. ',
      users[2]._id,
      Date(),
      [comments[2]._id],
      true,
  ),
    postCreation(0,
       'Billy Test Post 1',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget lectus tristique, hendrerit dolor sed, scelerisque nibh. In hac habitasse platea dictumst. Morbi imperdiet, velit non blandit gravida, dolor felis consequat ante, ut molestie nisl ligula nec enim. Sed erat lacus, vehicula et iaculis eget, vestibulum fermentum sapien. Vestibulum eget euismod odio, sed venenatis velit. Duis sed odio non neque faucibus varius. Cras imperdiet aliquet placerat. Proin accumsan lacus neque, nec lobortis ex rhoncus vel. Praesent ut lacus cursus, dictum justo ac, pretium orci. Nulla facilisi. Fusce sed turpis bibendum, vulputate libero id, tristique dui. Mauris rhoncus feugiat suscipit. Praesent sed malesuada magna. In cursus turpis risus, eget volutpat risus pellentesque ut. Nunc eu iaculis mauris, ac sollicitudin nisl. Suspendisse et viverra eros, efficitur iaculis quam. Proin hendrerit, dolor ac pulvinar placerat, odio leo porta mi, tempor feugiat nibh nisi eget turpis. Morbi vel ullamcorper nisl. Sed bibendum, lorem ac commodo vulputate, lacus purus semper massa, quis facilisis elit augue a lacus. Pellentesque pellentesque at enim in tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec eleifend venenatis turpis sit amet commodo. ',
      users[3]._id,
      Date(),
      [],
      false,
  ),
  ]);
};

async function createComments() {
  console.log('Creating Comments');
  await Promise.all ([
    commentCreation(0,
      users[1]._id,
      'OMG this is so great!',
      Date()
    ),
    commentCreation(1,
      users[2]._id,
      'OMG this is so bad!',
      Date(),
    ),
    commentCreation(2,
      users[0]._id,
      'Eh mine was better.',
      Date()
    ),
  ]);
};
