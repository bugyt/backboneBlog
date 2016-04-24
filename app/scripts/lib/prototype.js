'use strict';

(function() {

  Backbone.Collection.prototype.propLookup = function(prop, value) {
    var query = {};
    query[prop] = value;
    console.log(this);
    //var model = this.get(query);
    //var model = this.find(function(modelRes) { return modelRes.get(prop) === value; });
    var model = this.findWhere(query);
    var deferred = new $.Deferred();

    if (model) {
      deferred.resolve(model);
    } else {
      model = new app.Models.Post(query);
      model.getByProperty(prop);
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