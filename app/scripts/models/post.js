(function() {
  'use strict';

  app.Models.Post = Backbone.Model.extend({
    defaults: {
      title: '',
      content: '',
      date: ''
    }

  });

})();
