const createError = require('http-errors');
import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();

mongoose.connect(process.env.DB_URL);

require('./config/passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/', postRouter);
app.use('/', userRouter);

app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

const errorHandler:ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
};
app.use(errorHandler)

module.exports = app;
