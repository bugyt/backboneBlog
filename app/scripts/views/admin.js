'use strict';

(function() {

  app.Views.Admin = Backbone.View.extend({

    template: _.template(JST.admin),

    subViews: ['PostsList', 'PostForm'],

    subView: '',

    title: 'Administration',

    events: {
      'click .nav-tabs a': 'navigateTab'
    },

    initialize: function(options) {
      console.log(options);
      this.content = app.Helpers.generateNavTabs(this.subViews, {
        active: options.subView,
        model: options.model
      });
      this.render();
    },

    render: function() {
      this.setElement(this.content);
      return this;
    },

    navigateTab: function(e) {
      var target = $(e.currentTarget);
      app.mainRouter.navigate(target.data('url'), {trigger: false});
    }

  });

})();