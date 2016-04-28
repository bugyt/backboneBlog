'use strict';

(function() {

  var Router = Mn.AppRouter.extend({
    controller: app.postsController,

    appRoutes: {
      'post/:slug': 'showPost'

    },

    routes: {
      '': 'home',
      'admin(/:section)(/:subsection)(/:id)': 'admin',
      'post/:slug': 'showPost'
    },

    // initialize: function() {
    //   this.listenTo(this, 'route', this.change);
    // },

    admin: function(section, subsection, id) {
      console.log('routing to admin');

      if (!app.adminView || app.adminView.isDestroyed) {
        console.log('adminView doesn\'t exist');
        app.adminView = new app.Views.Admin();
      }

      app.mainView.showChildView('main', app.adminView);

      var route = section + '/' + subsection;
      route = route.toLowerCase();
      switch (route) {
        case 'posts/list':

          app.adminView.showChildView('main', new app.Views.PostsList());
          app.adminView.showChildView('bottom', new app.Views.PostForm());


          break;
        case 'posts/edit':
          app.adminView.getRegion('bottom').reset();
          if (!id) {
            app.adminView.showChildView('main', new app.Views.PostForm());
          } else {
            app.postsController.editPost(id);
          }
          break;
        default:

          app.adminView.showChildView('main', new app.Views.PostsList());
          app.adminView.showChildView('bottom', new app.Views.PostForm());

      }

    },

    home: function() {

      var postsList = new app.Views.PostsList();

      app.mainView.showChildView('main', postsList);


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

  app.router = new Router();

})();