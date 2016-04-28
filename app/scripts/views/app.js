'use strict';

(function() {

  app.Views.App = Mn.LayoutView.extend({

    el: '#app',

    events: {
      'click .nav li': 'navActive'
    },

    regions: {
      main: {
        el: '#main',
        currentView: ''
      }
    },

    navActive: function(e) {
      $(e.currentTarget).addClass('active').siblings().removeClass('active');
    }

  });

})();