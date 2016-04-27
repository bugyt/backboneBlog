'use strict';

(function() {

  var PostsCollection = Backbone.Collection.extend({

    model: app.Models.Post,
    url: 'http://163.172.131.193:3000/posts',
    comparator: function(model) {
      return -model.get('dateCreated');
    }
    //localStorage: new Backbone.LocalStorage('posts-backbone')
    //
  });

  app.Data.Posts = new PostsCollection();

})();