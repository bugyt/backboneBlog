'use strict';

(function() {

  var Posts = Backbone.Collection.extend({

    model: app.Models.Post,
    url: 'http://expressServer:3000/posts'
    //localStorage: new Backbone.LocalStorage('posts-backbone')

  });

  app.Collections.Posts = new Posts();

})();
