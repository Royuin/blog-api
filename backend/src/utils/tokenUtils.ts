import express, { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');


declare global {
  namespace Express {
    interface Request {
      token: string; 
    }
  }
}

function verifyToken(req:Request, res:Response, next:NextFunction) {
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    return res.status(403).json({ error: 'Unauthorized user'});
  }
};

exports.cookieJwtAuth = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, 'SECRET');
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/');
  }
};

module.exports.verifyToken = verifyToken;
