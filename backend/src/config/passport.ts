const passport = require('passport');
const User = require('../models/user');
import { ObjectId } from 'mongoose';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
const { validatePassword } = require('../utils/passwordUtils');
 const JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt;

interface jwt_payload {
  role: string;
  sub: string;
}

interface userDocument {
  username: string;
  passwordHash: string;
  posts: ObjectId[];
  isAuthor: boolean;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new LocalStrategy(function verify(username:string, password:string, done) {
  console.log('I AM USING AUTHENTICATE');
  User.find({username}).exec(), async function (err:unknown, user:userDocument) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Incorrect username.'}); }

    const isValid = await validatePassword(password, user.passwordHash);

    if(isValid) {
      return done(null, user);
    } else if (!isValid) {
      console.log('Is not valid');
      return done(err);
    }

    if (err) {
      console.log('Random error');
      done(err);
    };
  }
}));

// done set to any type because it is a callback function from passport library and @types was not fixing done having implicity of any
passport.use(new JwtStrategy(opts, function(jwt_payload:jwt_payload, done:any) {
  User.findOne({id: jwt_payload.sub}, function(err:unknown, user:userDocument) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));
