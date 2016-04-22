 'use strict';

 (function() {

   app.Views.PostForm = Backbone.View.extend({

     template: _.template(JST.postForm),

     title: 'Post form',

     events: {
       'click button[type="submit"]': 'createPost',
       'click button[type="reset"]': 'clear',
       'input input,textarea': 'validPost',
       'input #title': 'convertToSlug'

     },

     initialize: function() {
       this.render();
     },

     render: function() {
       var html = this.template();
       this.setElement(html);
       app.Helpers.editableLabel(this.$el);
       this.validPost();
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
       if (!this.validPost()) {
         return;
       }
       app.Collections.Posts.create(this.newAttributes(), {
         wait: true,
         success: function(model, res) {
           console.log('success callback ' + res.insertedIds[0]);
           model.set({
             _id: res.insertedIds[0]
           });

         },
         error: function(err) {
           console.log('error callback : ' + err);
         }
       });
       this.$('#title').val('');
       this.$('#content').val('');
       this.validPost();
     },

     validPost: function() {

       return app.Helpers.formValid(this.$el);

     },

     clear: function() {
       this.$('#title').parents('.form-group').removeClass('has-error');
       this.$('#title').siblings('.glyphicon').removeClass('glyphicon-remove');
       this.$('#content').parents('.form-group').removeClass('has-error');
       this.$('#content').siblings('.glyphicon').removeClass('glyphicon-remove');
     },

     convertToSlug: function(e) {
       var target = $(e.target);
       var text = app.Helpers.convertToSlug(target.val());
       this.$('input.slug, label.slug').text(text);
       this.$('input.slug').val(text);
     }

   });

 })();