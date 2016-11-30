// app.js

/**
* Module dependencies
*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app = express();

// Connect to our database
// mongoose.connect('mongodb://localhost:27017')

// routes
var routes = require('./routes/index');
var restAPI = require('./routes/restAPI');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', routes);
app.use('/expense', restAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// end error handlers

module.exports = app;
