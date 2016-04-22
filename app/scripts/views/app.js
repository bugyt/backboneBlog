'use strict';

(function() {

  app.Views.App = Backbone.View.extend({

    el: '#app',

    events: {
      'click .nav li': 'navActive'
    },

    initialize: function() {

    },

    render: function(subView) {
      this.$('#main').html(app.Helpers.ViewManager.showView(subView).$el);
      this.$('#main').prepend('<h2>' + subView.title + '</h2>');
    },

    navActive: function(e) {
      $(e.currentTarget).addClass('active').siblings().removeClass('active');
    }

  });

})();