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
    //urlRoot: 'http://163.172.131.193:3000/posts',

    // parse: function(response) {
    //   console.log(response);
    //   response['_id'] = response['_id'] || response.insertedIds[0];
    //   return response;
    // },
    // parse: function(data) {
    //   //    console.log('parse');
    //   //    console.log(data);
    //   //    console.log(test);
    //   if (_.has(data, 'ops')) {
    //     data = data.ops[0];
    //   }
    //   return data; // in this case your model will be mixed with server response after sync was call
    //   //    }
    // },

    getByProperty: function(prop) {
      // "this" is now our Model instance declared from the router
      this.url = this.urlRoot + '/' + prop + '/' + this.get(prop);
      console.log(this.url);
    }

  });

})();