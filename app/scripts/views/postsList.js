'use strict';

(function() {

  app.Views.PostsList = Backbone.View.extend({

    className: 'postsList',

    tagName: 'ul',

    title: 'Posts list',

    initialize: function() {

      var self = this;

      this.listenTo(app.Collections.Posts, 'sync', this.render);

      app.Collections.Posts.fetch({
      success: function(collection, response, options) {
        self.render();
      },
      error: function(err) {
        console.log('error callback : ' + err);
      }
    });

    },

    render: function() {

      var $list = this.$el.empty();

      app.Collections.Posts.each(function(model) {

        var item = new app.Views.PostPreview({
          model: model
        });

        $list.append(item.$el);

      });

      // var postForm = new app.Views.PostForm();
      // this.$el.append(postForm.render().$el);
      return this;
    }
  });

})();