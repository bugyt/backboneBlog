'use strict';

(function() {

  app.Views.PostsList = Backbone.View.extend({

    className: 'postsList',

    tagName: 'ul',

    title: 'Posts list',

    initialize: function() {

      this.listenTo(app.Collections.Posts, 'sync', this.render);
      this.render();

    },

    render: function() {

      var $list = this.$el.empty();

      app.Collections.Posts.each(function(model) {

        var item = new app.Views.Post({
          model: model
        });

        $list.append(item.$el);

      });

      return this;
    }

  });

})();
