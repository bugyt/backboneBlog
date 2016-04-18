(function() {
  'use strict';

  app.Views.AppView = Backbone.View.extend({

    el: '#main',

    template: _.template(JST.app),

    initialize: function() {
      this.listenTo(app.Collections.Posts, 'sync', this.render);
    },

    render: function() {

      this.$el.html(this.template({
        test: 'test'
      }));
      var $list = this.$('#postsList').empty();
      app.Collections.Posts.each(function(model) {
        var item = new app.Views.Post({model: model});
        $list.append(item.render().$el);
        console.log(model.get('id'));
      });
      var postForm = new app.Views.PostForm();
      this.$el.append(postForm.render().$el);

      return this;
    },

    test: function() {

      console.log('app.Views.AppView');

      alert('click');

    }


  });

})();
