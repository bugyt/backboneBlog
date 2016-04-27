'use strict';

(function() {

  app.Views.Admin = Mn.LayoutView.extend({

    template: _.template(JST.admin),

    regions: {
      main: '#tab'
    },

    childEvents: {
      'render:end': 'switchTab'
    },

    switchTab: function(child) {
      this.$('#' + child.name).addClass('active').siblings().removeClass('active');
    }

  });

})();