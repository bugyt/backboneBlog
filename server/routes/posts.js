'use strict';

var mongo = require('mongodb');
var limit = '\r\n------------------------------\r\n';
var Server = mongo.Server;
var Db = mongo.Db;
var db;

var BSON = require('bson').BSONPure;
var server = new Server('localhost', 27017, {
  auto_reconnect: true // eslint-disable-line camelcase
});

db = new Db('blog', server);

////////////////////////
// MongoDb connection //
////////////////////////
db.open(function(err) {
  console.log(limit);
  if (!err) {
    console.log('Connected to blog database');
    db.collection('posts', {
      strict: true
    }, function(errColl) {
      if (errColl) {
        console.log('The posts collection doesn\'t exist. Creating it with sample data...');
      }
    });
  }
});

//////////////////////
// Return all posts //
//////////////////////
exports.findAll = function(req, res) {
  console.log(limit);
  console.log('Finding all posts...');
  db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
      res.send({
        'error': 'An error has occurred '
      });
    } else {
      collection.find().toArray(function(err, items) {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          console.log('Success !');
          res.send(items);
        }
      });
    }
  });
};

////////////////
// Add a post //
////////////////
exports.addPost = function(req, res) {
  console.log(limit);
  var post = req.body;
  console.log('Adding post: ' + JSON.stringify(post));
  db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
      res.send({
        'error': 'An error has occurred' + errColl
      });
    } else {
      uniqueProp(collection, 'slug', post.slug)
        .then(function(resolve) {
          post.slug = resolve;
          console.log(resolve);
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
        }).catch(function(reject) {
          res.send({
            'error': 'An error has occurred ' + JSON.stringify(reject)
          });
        });
    }
  });
};

/////////////////
// Delete post //
/////////////////
exports.deletePost = function(req, res) {
  console.log(limit);
  var id = req.params.id;
  console.log('Deleting post...: ' + id);
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

/////////////////
// Update post //
/////////////////
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

//////////////////////////////
// Find a post by Mongo _id //
//////////////////////////////
exports.findById = function(req, res) {

  console.log(limit);

  var id = req.params.id;

  console.log('Retrieving post: ' + id);

  db.collection('posts', function(errColl, collection) {
    collection.findOne({
      '_id': new BSON.ObjectID(id)
    }, function(err, item) {
      if (err) {
        console.log('Error finding post by id: ' + err);
        res.send({
          'error': 'An error has occurred - ' + err
        });
      } else {
        console.log('Post found by id: ' + item);
        res.send(item);
      }

    });
  });
};

/////////////////////////////////////
// Find a post by a Mongo property //
/////////////////////////////////////
exports.findByProp = function(req, res) {

  var prop = req.params.prop;
  var value = req.params.value;

  console.log('Retrieving post by prop: ' + prop + ' = ' + value);

  db.collection('posts', function(errColl, collection) {
    collection.findOne({
      [prop]: value
    }, function(err, item) {
      if (err) {
        console.log('Error finding post by id: ' + err);
        res.send({
          'error': 'An error has occurred - ' + err
        });
      } else {
        console.log('Post found by property: ' + item);
        res.send(item);
      }
    });
  });
};

///////////////////////////////////////////////////////////////////////
// Check if a property is unique, if not the property is incremented //
///////////////////////////////////////////////////////////////////////
var uniqueProp = function(collection, prop, value) {
  return new Promise(function(resolve, reject) {
    collection.find({
      [prop]: {
        $regex: value
      }
    }).toArray(function(err, items) {
      if (err) {
        reject({
          'error': 'An error has occurred'
        });
      } else {
        var ii = 1;
        var tmp = value;
        var findItem = function(item) {
          return item[prop] === this;
        };
        while (items.find(findItem, tmp)) {
          tmp = value + ii.toString();
          ii++;
        }
        value = tmp;
        resolve(value);
      }
    });
  });
};