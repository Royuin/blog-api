const createError = require('http-errors');
import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

const errorHandler:ErrorRequestHandler = (err, req:Request, res:Response, next:NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};
app.use(errorHandler)

module.exports = app;
