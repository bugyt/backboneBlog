'use strict';

(function() {

  app.Routers = Backbone.Router.extend({

    routes: {
      '': 'home',
      '*admin': 'admin'
    },
    admin: function() {
      var postForm = new app.Views.PostForm();
      app.mainView.render(postForm);
    },
    home: function() {
      var postsList = new app.Views.PostsList({
        collection: app.Collections.Posts
      });
      app.mainView.render(postsList);
    }

  });

})();