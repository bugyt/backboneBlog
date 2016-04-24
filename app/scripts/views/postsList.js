'use strict';

(function() {

  app.Views.PostsList = Backbone.View.extend({

    className: 'postsList table-striped table-condensed table-responsive',

    tagName: 'table',

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
      var $header = $('<tr/>');

      $('<th/>').appendTo($header);
      $('<th/>').html('Title').appendTo($header);
      $('<th/>').html('Date').appendTo($header);
      $('<th/>').appendTo($header);

      $list.append($header);

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