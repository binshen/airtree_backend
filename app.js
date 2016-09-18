var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require("config");
var mongoose = require('mongoose');
var requireDir = require('require-dir');
var expressPromise = require('express-promise');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
//var MongoStore = require('connect-mongo')(session);
var FileStreamRotator = require('file-stream-rotator');
var wrap = require('co-express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

app.use(logger('combined', {
  stream: accessLogStream,
  skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride());
app.use(expressPromise());

//session
var options = {
  path: "/tmp/sessions/",
  useAsync: true,
  reapInterval: 5000,
  maxAge: 10000
};
app.use(session({
  store: new FileStore(options),
  secret: 'moral2016_airtree_backend',
  resave: true,
  saveUninitialized: true
}));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.uri);
mongoose.set('debug', false);

// app.use(session({
//   secret: 'moral2016_airtree_backend',
//   saveUninitialized: false, // don't create session until something stored
//   resave: false, //don't save session if unmodified
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection
//   })
// }));

var models = requireDir(__dirname + '/models');
for(var i in models) { models[i](mongoose); }

var routes = requireDir(__dirname + '/routes');
for(var i in routes) {
  routes[i](app, express.Router(), wrap, mongoose);
}

// var routes = requireDir(__dirname + '/routes');
// for(var i in routes) {
//   routes[i](app, mongoose, config);
//   console.log(routes[i])
// }


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
  //res.redirect('/');
});


module.exports = app;
