'use strict';

var Application = Mn.Application.extend({
  Models: {},
  Views: {},
  Helpers: {},
  Data: {}
});

var app = new Application();

app.on('start', function() {

  marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  window.onerror = function(error) {
    alert(error);
  };


  app.Data.Posts.fetch().then(function() {

    app.mainView = app.mainView || new app.Views.App();
    Backbone.history.start();

  }).fail(function(err) {
    console.log('Error : ' + JSON.stringify(err));

  });

});

$(function() {
  app.start();
});