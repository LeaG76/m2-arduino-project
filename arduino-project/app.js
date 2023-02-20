/*
 ┌────────────────────────────────────────────────────────────────────────────┐
 │ @name         Arduino Project | Simulation of a scene with a traffic light │
 │ @author       Léa Gallier & Kévin Leroux                                   │
 │ @version      1.0                                                          │
 │ @created      2023-02-02                                                   │
 └────────────────────────────────────────────────────────────────────────────┘
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var walkerWriterRouter = require('./routes/write-walker-data');
var carWriterRouter = require('./routes/write-car-data');

var fs = require('fs');
var port = 3001;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/write-walker-data', walkerWriterRouter);
app.use('/write-car-data', carWriterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(express.static(__dirname + '/'));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.json());

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
  console.log('http://localhost:3001');
});

module.exports = app;
