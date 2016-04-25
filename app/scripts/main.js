'use strict';

var App = Marionette.Application.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Controllers: {},
  Helpers: {}
});

Marionette.Application.prototype.Models = {};
Marionette.Application.prototype.Collections = {};
Marionette.Application.prototype.Views = {};
Marionette.Application.prototype.Routers = {};
Marionette.Application.prototype.Controllers = {};
Marionette.Application.prototype.Helpers = {};

var app = new Marionette.Application();

$(function() {
  app.on('start', function() {
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
    window.onerror = function(error) {
      alert(error);
    };
    console.log('what');
    app.mainView = app.mainView || new app.Views.App();
    app.postController = app.postController || new app.Controllers.Posts();
    app.mainRouter = app.mainRouter || new app.Routers();
    Backbone.history.start();
  });
  app.start();
});