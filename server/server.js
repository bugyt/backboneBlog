var express = require('express'),
    posts = require('./routes/posts');
    bodyParser = require('body-parser');
    
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/posts', posts.findAll);
app.get('/posts/:id', posts.findById);
app.post('/posts', posts.addWine);
app.put('/posts/:id', posts.updateWine);
app.delete('/posts/:id', posts.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');