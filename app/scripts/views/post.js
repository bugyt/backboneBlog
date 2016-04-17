/*global app, Backbone, JST*/

app.Views = app.Views || {};

(function() {
  'use strict';

  app.Views.Post = Backbone.View.extend({

    //template: JST.get('AppView'),

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }

  });

})();
