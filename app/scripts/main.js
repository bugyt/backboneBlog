'use strict';

var app = app || {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    var appView = new app.Views.AppView();
    appView.render();
  }
};

$(function() {
  app.init();
});
