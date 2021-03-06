'use strict';

(function() {
  Backbone.Model.prototype.idAttribute = '_id';

  app.Models.Post = Backbone.Model.extend({

    defaults: {
      _id: null,
      title: '',
      slug: '',
      content: '',
      dateCreated: '',
      dateModified: ''
    },
    urlRoot: 'http://163.172.131.193:3000/posts',

    getByProperty: function(prop) {
      // "this" is now our Model instance declared from the router
      this.url = this.urlRoot + '/' + prop + '/' + this.get(prop);
      console.log(this.url);
    }

  });

})();