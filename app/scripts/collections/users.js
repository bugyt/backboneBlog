'use strict';

(function() {

  var UsersCollection = Backbone.Collection.extend({

    model: app.Models.User,
    url: 'http://163.172.131.193:3000/users'

  });

  app.Data.Users = new UsersCollection();

})();