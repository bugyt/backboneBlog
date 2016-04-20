var express = require('express'),
    posts = require('./routes/posts');
    logger = require('morgan');
    bodyParser = require('body-parser');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
}

app.use(allowCrossDomain);
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.get('/posts', posts.findAll);
// app.get('/posts/:id', posts.findById);
app.post('/posts', posts.addPost);
// app.put('/posts/:id', posts.updateWine);
app.delete('/posts/:id', posts.deletePost);

module.exports = app;
//app.listen(3000);
console.log('Listening on port 3000...');

// var express = require('express');
// var path = require('path');
// var logger = require('morgan');

// var app = express();

// var MongoClient = require('mongodb').MongoClient;

// //app.use(MongoClient);

// //CORS middleware
// var allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

//   next();
// }

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(allowCrossDomain);
// //app.use('/posts', routes);
// //
// app.get('/posts', function(req, res) {
//   console.log('Hello World!');
//   MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
//     if (err) {
//       throw err;
//     } else {
//       console.log('Mongo connected !');
//     }

//     db.collection('posts', function(err, collection) {
//         collection.find().toArray(function(err, items) {
//             res.send(items);
//         });
//     });

//   });
// });

// app.post('/posts', function(req, res, next) {
//   console.log('post post' + req);
//   console.dir(req.params.message);
//   var post = req.body;
//   console.log('Adding post: ' + JSON.stringify(post));
//   // MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
//   //   if (err) {
//   //     throw err;
//   //   } else {
//   //     console.log('Mongo connected !');
//   //   }

//   //   db.collection('posts').insert(post, {safe:true}, function(err, records) {
//   //     console.log("Record added as " + records[0]._id);
//   //   });
//   //   // var collection = db.collection('posts');
//   //   // collection('posts', function(err, collection) {
//   //   //   collection.insert(post, {
//   //   //     safe: true
//   //   //   }, function(err, result) {
//   //   //     if (err) {
//   //   //       res.send({
//   //   //         'error': 'An error has occurred'
//   //   //       });
//   //   //     } else {
//   //   //       console.log('Success: ' + JSON.stringify(result[0]));
//   //   //       res.send(result[0]);
//   //   //     }
//   //   //   });
//   //   // });
//   // });
// });

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });



// module.exports = app;