'use strict';

(function() {

  app.Views.PostsListItems = Mn.CollectionView.extend({
    tagName: 'tbody',
    name: 'postslist',
    childView: app.Views.PostPreview
  });


  app.Views.PostsList = Backbone.View.extend({
    template: _.template(JST.postsList),
    tagName: 'table',
    className: 'postsList table-striped table-condensed table-responsive',
    initialize: function() {
      app.Data.Posts.fetch().then(() => {
        this.listenTo(this.collection, 'sync', this.render);
      });

    },
    render: function() {
      this.$el.html(this.template());
      var postsListItems = new app.Views.PostsListItems({
        collection: app.Data.Posts
      });
      this.$el.append(postsListItems.render().$el);

    }
  });


})();