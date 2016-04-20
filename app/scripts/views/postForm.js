 'use strict';

(function() {

 app.Views.PostForm = Backbone.View.extend({

   template: _.template(JST.postForm),

   title: 'Post form',

   events: {
     'click #submit': 'createPost'
   },

   initialize: function() {
     this.render();
   },

   render: function() {
     var html = this.template();
     this.setElement(html);
     return this;
   },

   newAttributes: function() {
     return {
       title: this.$('#title').val().trim(),
       content: this.$('#content').val().trim(),
       date: _.now()
     };
   },

   createPost: function(e) {
     e.preventDefault();
     app.Collections.Posts.create(this.newAttributes());
     this.$('#title').val('');
     this.$('#content').val('');
     console.log('save ' + app.Collections.Posts.length);
   }


 });

})();