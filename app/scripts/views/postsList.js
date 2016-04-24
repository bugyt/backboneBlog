'use strict';

(function() {

  app.Views.PostsList = Backbone.View.extend({

    className: 'postsList table-striped table-condensed table-responsive',

    tagName: 'table',

    title: 'Posts list',

    initialize: function() {

      var self = this;

      app.Collections.Posts.fetch({
        success: function(collection) {
          self.listenTo(collection, 'sync', self.render);
        },
        error: function(err) {
          console.log('error callback : ' + err);
        }
      });

    },

    render: function() {

      var $table = this.$el.html('');
      var $header = $('<tr/>');

      $('<th/>').appendTo($header);
      $('<th/>').html('Title').appendTo($header);
      $('<th/>').html('Date').appendTo($header);
      $('<th/>').appendTo($header);

      $table.append($header);

      app.Collections.Posts.each(function(model) {

        var item = new app.Views.PostPreview({
          model: model
        });

        $table.append(item.$el);

      });

      if (!$('.form-horizontal').length) {
        var postForm = new app.Views.PostForm();
        $(postForm.render().$el).insertAfter(this.$el);
      }

      return this;
    }
  });

})();