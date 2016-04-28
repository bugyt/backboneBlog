/*eslint no-underscore-dangle: 0*/
'use strict';

var connect = require('../lib/connect');
var lib = require('../lib/functions');

//////////////////////
// Return all users //
//////////////////////
exports.findAll = function(req, res) {
  console.log(connect.limit);
  console.log('Finding all users...');
  connect.db.collection('users', function(errColl, collection) {
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
// Add a user //
////////////////
exports.addUser = function(req, res) {
  console.log(connect.limit);
  var user = req.body;
  console.log('Adding user: ' + JSON.stringify(user));
  connect.db.collection('users', function(errColl, collection) {
    if (errColl) {
      console.log(errColl);
      res.send({
        'error': 'An error has occurred' + errColl
      });
    } else {

      collection.insert(user, {
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
    }
  });
};

/////////////////
// Delete user //
/////////////////
exports.deleteUser = function(req, res) {
  console.log(connect.limit);
  var id = req.params.id;
  console.log('Deleting user...: ' + id);
  connect.db.collection('users', function(errColl, collection) {
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
// Update user //
/////////////////
exports.updateUser = function(req, res) {
  console.log(connect.limit);
  var id = req.params._id;
  var user = req.body;
  //user._id = new BSON.ObjectID(id);
  delete(user._id);
  console.log('Updating user: ' + id);
  console.log(JSON.stringify(user));
  connect.db.collection('users', function(errColl, collection) {

    collection.update({
      '_id': new connect.BSON.ObjectID(id)
    }, user, {
      safe: true
    }, function(err, result) {
      if (err) {
        console.log('Error updating user: ' + err);
        res.send({
          'error': 'An error has occurred - ' + err
        });
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(user);
      }
    });

  });
};

//////////////////////////////
// Find a user by Mongo _id //
//////////////////////////////
exports.findById = function(req, res) {

  console.log(connect.limit);

  var id = req.params.id;

  console.log('Retrieving user: ' + id);

  connect.db.collection('users', function(errColl, collection) {
    collection.findOne({
      '_id': new connect.BSON.ObjectID(id)
    }, function(err, item) {
      if (err) {
        console.log('Error finding user by id: ' + err);
        res.send({
          'error': 'An error has occurred - ' + err
        });
      } else {
        console.log('User found by id: ' + item);
        res.send(item);
      }

    });
  });
};

/////////////////////////////////////
// Find a user by a Mongo property //
/////////////////////////////////////
exports.findByProp = function(req, res) {

  console.log(connect.limit);

  var prop = req.params.prop;
  var value = req.params.value;

  console.log('Retrieving user by prop: ' + prop + ' = ' + value);

  connect.db.collection('users', function(errColl, collection) {
    collection.findOne({
      [prop]: value
    }, function(err, item) {
      if (err) {
        console.log('Error finding user by id: ' + err);
        res.send({
          'error': 'An error has occurred - ' + err
        });
      } else {
        console.log('User found by property: ' + item);
        res.send(item);
      }
    });
  });
};