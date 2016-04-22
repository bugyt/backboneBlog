'use strict';

(function() {

  app.Views.PostsList = Backbone.View.extend({

    className: 'postsList',

    tagName: 'ul',

    title: 'Posts list',

    initialize: function() {

      this.listenTo(app.Collections.Posts, 'sync', this.render);
      app.Collections.Posts.fetch();
      this.render();

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