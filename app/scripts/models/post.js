'use strict';

(function() {

  app.Models.Post = Backbone.Model.extend({
    defaults: {
      title: '',
      content: '',
      date: ''
    }

  });

})();