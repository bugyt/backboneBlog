var express = require('express');
var router = express.Router();

router.get('/posts', function(req, res, next) {
  console.log('posts');
  //res.render('index', { title: 'Express' });
  db.collection('posts').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    return result;
  });
});

router.post('/posts', function(req, res, next) {
  console.log('post post' + req);
  return res;
});


module.exports = router;
