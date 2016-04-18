(function() {
  'use strict';

  app.Views.Post = Backbone.View.extend({

    template: _.template(JST.post),

    //tagName: 'li',

    events: {},

    initialize: function() {
      //this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      console.log(this.model);
      this.$el.html(this.template(this.model.toJSON()));
      console.log(this.$el.html());
      return this;
    }

  });

})();
