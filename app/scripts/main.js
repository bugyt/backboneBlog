'use strict';

var app = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Helpers: {},
  init: function() {
    app.mainView = app.mainView || new app.Views.App();
    app.mainRouter = app.mainRouter || new app.Routers();
    Backbone.history.start();
  }
};

window.onerror = function(error) {
  alert(error);
};

$(function() {
  app.init();
});