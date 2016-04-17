app.Views = app.Views || {};

(function() {
  'use strict';

  app.Views.AppView = Backbone.View.extend({

    template: _.template(JST.AppView),

    events: {
      'click h1': 'test'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      console.log('app.Views.AppView.render');
      this.$el.html(this.template({
        test: 'test'
      }));
      $('.container').append(this.$el);
    },

    test: function() {
      console.log('app.Views.AppView');
      alert('click');
    }


  });

})();
