'use strict';



var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var db;

var server = new Server('localhost', 27017, {
  auto_reconnect: true // eslint-disable-line camelcase
});

db = new Db('blog', server);

////////////////////////
// MongoDb connection //
////////////////////////
db.open(function(err) {
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

module.exports = {
  db: db,
  BSON: require('bson').BSONPure,
  limit: '\r\n------------------------------\r\n'
};