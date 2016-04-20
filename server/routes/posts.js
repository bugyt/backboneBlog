var mongo = require('mongodb');
var fs = require('fs');

var Server = mongo.Server,
  Db = mongo.Db,
  //BSON = mongo.BSONPure;
  BSON = require('bson').BSONPure
  
var server = new Server('localhost', 27017, {
  auto_reconnect: true
});
db = new Db('test', server);

db.open(function(err, db) {
  if (!err) {
    console.log('Connected to testDb database');
    db.collection('posts', {
      strict: true
    }, function(err, collection) {
      if (err) {
        console.log('The posts collection doesn\'t exist. Creating it with sample data...');
      }
    });
  }
});

exports.findAll = function(req, res) {
  db.collection('posts', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.addPost = function(req, res) {
  fs.writeFile("./test", '', function(err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });
  var post = req.body;
  console.log(post);
  console.log('Adding post: ' + JSON.stringify(post));
  db.collection('posts', function(err, collection) {
    if (err) {
      console.log(err)
    } else {
      collection.insert(post, {
        safe: true
      }, function(err, result) {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          console.log('Success: ' + JSON.stringify(result[0]));
          res.send(result[0]);
        }
      });
    }

  });
}


exports.deletePost = function(req, res) {
  var id = req.params.id;
  console.log('Deleting post: ' + id);
  db.collection('posts', function(err, collection) {
    if (err) {
      console.log(err)
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
}