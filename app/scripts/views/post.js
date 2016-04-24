'use strict';

(function() {

  app.Views.Post = Backbone.View.extend({

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
      this.title = this.model.get('title');
      this.render();
    },

    render: function() {
      this.setElement(marked(this.model.get('content')));
      return this;
    }

  });

})();