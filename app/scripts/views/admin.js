'use strict';

(function() {

  app.Views.Admin = Backbone.View.extend({

    template: _.template(JST.admin),

    subViews: ['PostsList', 'PostForm'],

    title: 'Administration',

    events: {
      'click .nav li': 'navActive'
    },

    initialize: function() {
      this.content = app.Helpers.generateTabs(this.subViews);
      this.render();
    },

    render: function() {
      this.setElement(this.content);
      return this;
    }

  });

})();