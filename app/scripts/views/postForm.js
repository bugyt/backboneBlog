 'use strict';

 (function() {

   app.Views.PostForm = Backbone.View.extend({

     template: _.template(JST.postForm),

     title: 'Add a post',

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
       console.log('eeeee' + this.$('.slug input').val());
       return {

         title: this.$('#title').val().trim(),
         content: this.$('#content').val().trim(),
         slug: this.$('.slug input').val().trim(),
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
           $.notify('Success ! Post added.', {
             className: 'success',
             style: 'bootstrap'
           });
         },
         error: function(err) {
           console.log('error callback : ' + err);
         }
       });
       this.clear();
     },

     validPost: function() {

       return app.Helpers.formValid(this.$el);

     },

     clear: function() {
       this.$el.find('input[type=text], textarea').val('');
       this.$('.slug label:not(.control-label)').text('');
       this.validPost();
     },

     convertToSlug: function(e) {
       var target = $(e.target);
       var text = app.Helpers.slugify(target.val());
       this.$('.slug label:not(.control-label)').text(text);
       console.log(this.$('.slug input'));
       this.$('.slug input').val(text);
       console.log(this.$('.slug input').val());
     }

   });

 })();