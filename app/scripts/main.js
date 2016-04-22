'use strict';

var app = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Helpers: {},
  init: function() {
    // app.Collections.Posts.fetch({
    //   success: function(collection, response, options) {
    //     app.mainView = app.mainView || new app.Views.App();
    //     app.mainRouter = app.mainRouter || new app.Routers();
    //     Backbone.history.start();
    //   },
    //   error: function(err) {
    //     console.log('error callback : ' + err);
    //   }
    // });
    app.mainView = app.mainView || new app.Views.App();
    app.mainRouter = app.mainRouter || new app.Routers();
    Backbone.history.start();
  }
};

window.onerror = function(error) {
  alert(error);
};

$(function() {
  marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  app.init();
});