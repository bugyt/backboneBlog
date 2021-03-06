'use strict';

(function() {

  app.Views.PostPreview = Backbone.View.extend({

    template: _.template(JST.postPreview),
    //el: 'tr',
    tagName: 'tr',
    events: {
      'click .destroy': 'clear',
      'click .edit': 'edit'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.model.set('dateFormat', app.Helpers.formatLocalDate(new Date(this.model.get('dateCreated'))));
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
    test: function() {
      console.log('change');
    },

    // Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
      console.log(this.model);
      this.model.destroy();
    }


  });

})();