'use strict';

var mongo = require('mongodb');
var fs = require('fs');
var limit = '\r\n------------------------------\r\n';
var Server = mongo.Server;
var Db = mongo.Db;
var db;

var BSON = require('bson').BSONPure;

var server = new Server('localhost', 27017, {
  /*eslint camelcase: 1*/
  auto_reconnect: true
});
db = new Db('test', server);

db.open(function(err) {
  console.log(limit);
  if (!err) {
    console.log('Connected to testDb database');
    db.collection('posts', {
      strict: true
    }, function(errColl) {
      if (errColl) {
        console.log('The posts collection doesn\'t exist. Creating it with sample data...');
      }
    });
  }
});

exports.findAll = function(req, res) {
  console.log(limit);
  db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
    } else {
      collection.find().toArray(function(err, items) {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          res.send(items);
        }
      });
    }

  });
};

exports.addPost = function(req, res) {
  console.log(limit);
  fs.writeFile('./test', '', function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
  var post = req.body;
  console.log(post);
  console.log('Adding post: ' + JSON.stringify(post));
  db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
    } else {
      collection.insert(post, {
        safe: true
      }, function(err, result) {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          console.log('Success: ' + JSON.stringify(result));
          res.send(result);
        }
      });
    }

  });
};


exports.deletePost = function(req, res) {
  console.log(limit);
  var id = req.params.id;
  console.log('Deleting post: ' + id);
  db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
    } else {
      collection.remove({
        '_id': new BSON.ObjectID(id)
      }, {
        safe: true
      }, function(err, result) {
        if (err) {
          res.send({
            'error': 'An error has occurred - ' + err
          });
        } else {
          console.log('' + result + ' document(s) deleted');
          res.send(req.body);
        }
      });
    }
  });
};


exports.updatePost = function(req, res) {
  console.log(limit);
  var id = req.params.id;
  var post = req.body;
  console.log('Updating post: ' + id);
  console.log(JSON.stringify(post));
  db.collection('posts', function(errColl, collection) {
    collection.update({
      '_id': new BSON.ObjectID(id)
    }, post, {
      safe: true
    }, function(err, result) {
      if (err) {
        console.log('Error updating post: ' + err);
        res.send({
          'error': 'An error has occurred - ' + err
        });
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(post);
      }
    });
  });
};

exports.findById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving post: ' + id);
  db.collection('posts', function(errColl, collection) {
    collection.findOne({
      '_id': new BSON.ObjectID(id)
    }, function(err, item) {
      res.send(item);
    });
  });
};

exports.findByProp = function(req, res) {
  var prop = req.params.prop;
  var value = req.params.value;
  var query = {};
  query[prop] = value;
  console.log('Retrieving post by prop: ' + prop + ' = ' + value);
  db.collection('posts', function(errColl, collection) {
    collection.findOne(query, function(err, item) {
      res.send(item);
    });
  });
};