window.app = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    'use strict';
    console.log('app.init');
    new app.Views.AppView();
  }
};

$(function() {
  'use strict';
  app.init();
});
