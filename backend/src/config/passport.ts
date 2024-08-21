const passport = require('passport');
const User = require('../models/user');
import { ObjectId } from 'mongoose';
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

interface jwt_payload {
  role: string;
  sub: string;
}

interface userDocument {
  id: ObjectId,
  username: string;
  passwordHash: string;
  posts: ObjectId[];
  isAuthor: boolean;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

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
