'use strict';

var express = require('express');
var posts = require('./routes/posts');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');

var app = express();

// CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://163.172.131.193:9000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

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


// Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/posts', posts.findAll);
app.get('/posts/:id', posts.findById);
app.get('/posts/:prop/:value', posts.findByProp);
// Routes HTTP POST requests to the specified path with the specified callback functions.
app.post('/posts', posts.addPost);
app.post('/posts', posts.addPost);
app.put('/posts/:_id', posts.updatePost);
app.delete('/posts/:id', posts.deletePost);

module.exports = app;
//app.listen(3000);
console.log('Listening on port 3000...');