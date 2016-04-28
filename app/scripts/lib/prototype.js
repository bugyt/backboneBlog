'use strict';

(function() {

  Backbone.Collection.prototype.propLookup = function(prop, value) {
    var query = {};
    query[prop] = value;
    var model = this.findWhere(query);
    var deferred = new $.Deferred();
    if (model) {
      deferred.resolve(model);
    } else {
      console.log('pas trouvé');
      model = new app.Models.Post(query);
      model.getByProperty(prop);
      console.log(JSON.stringify(model));
      model.fetch({
        success: function(fetchedModel) {
          deferred.resolve(fetchedModel);
        },
        error: function(err) {
          console.log(err);
          deferred.reject(err);
        }
      });
    }
    // Returning a Promise so that only this function can modify
    // the Deferred object
    return deferred.promise();
  };

  Backbone.Collection.prototype.idLookup = function(id) {
    var model = this.get(id);
    var deferred = new $.Deferred();

    if (model) {
      deferred.resolve(model);
    } else {
      model = new app.Models.Post({
        _id: id
      });
      model.fetch({
        success: function(fetchedModel) {
          deferred.resolve(fetchedModel);
        }
      });
    }

    // Returning a Promise so that only this function can modify
    // the Deferred object
    return deferred.promise();
  };
})();