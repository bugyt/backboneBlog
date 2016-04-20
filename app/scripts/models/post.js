'use strict';

(function() {

  app.Models.Post = Backbone.Model.extend({
    defaults: {
      title: '',
      content: '',
      date: ''
    },
    idAttribute: '_id'

    // initialize: function(response) {
    //   response._id = response._id['$id'];

    //   return response;
    // }

  });

})();