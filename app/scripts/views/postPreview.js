'use strict';

(function() {


  app.Views.PostPreview = Backbone.View.extend({

    template: _.template(JST.postPreview),

    events: {
      'click .destroy': 'clear'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'sync', this.render);
      this.render();
    },

    render: function() {
      this.model.set('dateFormat', new Date(this.model.get('date')));
      this.setElement(this.template(this.model.toJSON()));

      return this;

    },

    // Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
      this.model.destroy();
    }

  });

})();