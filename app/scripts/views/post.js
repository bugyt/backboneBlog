'use strict';

(function() {


  app.Views.Post = Backbone.View.extend({

    template: _.template(JST.post),

    events: {
      'click .destroy': 'clear'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();

    },

    render: function() {

      this.setElement(this.template(this.model.toJSON()));

      return this;

    },

    // Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function () {
      this.model.destroy();
    }

  });

})();