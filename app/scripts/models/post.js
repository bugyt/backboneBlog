/*global Backbone, app*/

app.Models = app.Models || {};

(function() {
  'use strict';

  app.Models.Post = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    },

    // Toggle the `completed` state of this todo item.
    toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }

  });

})();
