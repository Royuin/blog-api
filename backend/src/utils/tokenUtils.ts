import { Request, Response, NextFunction } from "express";

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

});
