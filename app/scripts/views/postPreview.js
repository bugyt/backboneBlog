'use strict';

(function() {


  app.Views.PostPreview = Backbone.View.extend({

    template: _.template(JST.postPreview),

    events: {
      'click .destroy': 'clear',
      'click .edit': 'edit'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'sync', this.render);
      this.render();
    },

    render: function() {
      this.model.set('dateFormat', app.Helpers.formatLocalDate(new Date(this.model.get('dateCreated'))));
      this.setElement(this.template(this.model.toJSON()));

      return this;

    },

    // Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
      console.log(this.model);
      this.model.destroy();
    }


  });

})();