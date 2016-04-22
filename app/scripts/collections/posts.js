'use strict';

(function() {

  var Posts = Backbone.Collection.extend({

    model: app.Models.Post,
    url: 'http://163.172.131.193:3000/posts',
    comparator: function(model) {
      return -model.get('date');
    }


    //localStorage: new Backbone.LocalStorage('posts-backbone')

  });

  app.Collections.Posts = new Posts();

})();