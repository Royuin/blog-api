const passport = require('passport');
const User = require('../models/user');
import { ObjectId } from 'mongoose';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

interface userDocument {
  username: string;
  passwordHash: string;
  posts: ObjectId[];
  isAuthor: boolean;
};

passport.use(new LocalStrategy(function verify(username:string, password:string, done) {
  User.find({username}).exec(), async function (err:unknown, user:userDocument) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Incorrect username.'}); }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if(isValid) {
      return done(null, user);
    } else if (!isValid) {
      return done(err);
    }
  }
}));
