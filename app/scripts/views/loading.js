'use strict';

(function() {

  var Loading = Backbone.View.extend({

    template: _.template(JST.loading),


    title: '',

    initialize: function() {
      this.render();
    },

    render: function() {
      this.setElement(this.template());
      return this;
    }

  });

  app.load = function() {
    app.mainView.showChildView('main', new Loading());
  };

})();