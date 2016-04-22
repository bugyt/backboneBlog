'use strict';

(function() {

  app.Routers = Backbone.Router.extend({

    routes: {
      '': 'home',
      'admin': 'admin',
      'post/:id': 'post'
    },

    initialize: function() {
      this.listenTo(this, 'route', this.change);
    },

    admin: function() {
      var postForm = new app.Views.PostForm();
      app.mainView.render(postForm);
    },
    home: function() {
      var postsList = new app.Views.PostsList();
      app.mainView.render(postsList);
    },
    post: function(id) {
      console.log('post')
      //app.Collections.Posts.idLookup(id).then(function(model) {
      app.Collections.Posts.propLookup('title', 'Lorem Ipsum').then(function(model) {
        var postView = new app.Views.Post({
          model: model
        });

        //var post = new app.Views.Post(app.Collections.Posts.get(id));
        app.mainView.render(postView);
      });

    }

    // // fired before every route.
    // execute: function(callback, args, name) {
    //   // console.log(app.mainView.$el);
    //   app.mainView.$('#main').html(JST.loading);
    //   //args.push(parseQueryString(args.pop()));
    //   if (callback) {
    //     callback.apply(this, args);
    //   }
    // }


  });

})();