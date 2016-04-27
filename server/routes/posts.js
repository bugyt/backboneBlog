/*eslint no-underscore-dangle: 0*/
'use strict';

var connect = require('../lib/connect');
var lib = require('../lib/functions');

//////////////////////
// Return all posts //
//////////////////////
exports.findAll = function(req, res) {
  console.log(connect.limit);
  console.log('Finding all posts...');
  connect.db.collection('posts', function(errColl, collection) {
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
  console.log(connect.limit);
  var post = req.body;
  console.log('Adding post: ' + JSON.stringify(post));
  connect.db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
      res.send({
        'error': 'An error has occurred' + errColl
      });
    } else {
      lib.uniqueProp(collection, 'slug', post.slug)
        .then(function(resolve) {
          post.slug = resolve;
          collection.insert(post, {
            safe: true
          }, function(err, result) {
            if (err) {
              res.send({
                'error': 'An error has occurred'
              });
            } else {
              console.log('Success: ' + JSON.stringify(result));
              res.send(result.ops[0]);
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
  console.log(connect.limit);
  var id = req.params.id;
  console.log('Deleting post...: ' + id);
  connect.db.collection('posts', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
    } else {
      collection.remove({
        '_id': new connect.BSON.ObjectID(id)
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
  console.log(connect.limit);
  var id = req.params._id;
  var post = req.body;
  //post._id = new BSON.ObjectID(id);
  delete (post._id);
  console.log('Updating post: ' + id);
  console.log(JSON.stringify(post));
  connect.db.collection('posts', function(errColl, collection) {
    collection.update({
      '_id': new connect.BSON.ObjectID(id)
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

  console.log(connect.limit);

  var id = req.params.id;

  console.log('Retrieving post: ' + id);

  connect.db.collection('posts', function(errColl, collection) {
    collection.findOne({
      '_id': new connect.BSON.ObjectID(id)
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

  connect.db.collection('posts', function(errColl, collection) {
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

