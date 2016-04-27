'use strict';

(function() {
  var PostsController = Mn.Object.extend({

    showPost: function(slug) {
      console.log('showPost', slug);
      app.load();
      app.Data.Posts.propLookup('slug', slug).then(function(model) {
        var postView = new app.Views.Post({
          model: model
        });
        app.mainView.showChildView('main', postView);
      });
    },

    editPost: function(id) {
      app.Data.Posts.idLookup(id).then(function(model) {
        app.adminView.showChildView('main', new app.Views.PostForm({
          model: model
        }));
      });
    },

    createPost: function(model) {
      var deferred = new $.Deferred();
      var id = model.get('_id');
      app.Data.Posts.create(model, {
        wait: true,
        success: function() {
          if (!id) {
            $.notify('Success ! Post added.', 'success');
          } else {
            $.notify('Success ! Post updated.', 'success');
          }
          deferred.resolve();
        },
        error: function(err) {
          console.log('error callback : ' + err);
          deferred.reject();
        }
      });
      return deferred.promise();
    }
  });

  app.postsController = new PostsController();

})();