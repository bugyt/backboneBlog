'use strict';

// Node modules loading
var express = require('express');
var posts = require('./routes/posts');
var users = require('./routes/users');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var helmet = require('helmet');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');


var app = express();

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  var allowedOrigins = ['http://163.172.131.193:9000', 'http://localhost:9000', 'http://127.0.0.1:9000',
    'http://dev.laurenth.fr'
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://163.172.131.193:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

//app.configure(function() {
// Mounts the specified middleware function or functions at the specified path. If path is not specified, it defaults to “/”.
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(compression());
// Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
  secret: 'cookie_secret',
  name: 'cookie_name',
  //store: 'sessionStore', // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));
//});

// Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/posts', posts.findAll);
app.get('/posts/:id', posts.findById);
app.get('/posts/:prop/:value', posts.findByProp);
// Routes HTTP POST requests to the specified path with the specified callback functions.
app.post('/posts', posts.addPost);
app.put('/posts/:_id', posts.updatePost);
app.delete('/posts/:id', posts.deletePost);

// Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.get('/users/:prop/:value', users.findByProp);
// Routes HTTP POST requests to the specified path with the specified callback functions.
app.post('/users', users.addUser);
app.put('/users/:_id', users.updateUser);
app.delete('/users/:id', users.deleteUser);

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

module.exports = app;
//app.listen(3000);
console.log('Listening on port 3000...');