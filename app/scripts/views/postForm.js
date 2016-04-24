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
       console.log('app.Views.PostForm.render');
       this.edit = (this.model !== undefined);

       this.model = this.model || new app.Models.Post();
       var html = this.template(this.model.toJSON());
       this.setElement(html);
       if (!this.edit) {
         app.Helpers.editableLabel(this.$el);
       } else {
         this.$('input.clickedit').hide();
       }
       this.validPost();
       return this;
     },

     newAttributes: function() {
       return {
         title: this.$('#title').val().trim(),
         content: this.$('#content').val().trim(),
         slug: this.$('.slug input').val().trim(),
         dateCreated: _.now(),
         dateModified: _.now()
       };
     },

     editAttributes: function() {
       return {
         title: this.$('#title').val().trim(),
         content: this.$('#content').val().trim(),
         slug: this.$('.slug input').val().trim(),
         dateModified: _.now()
       };
     },

     createPost: function(e) {
       e.preventDefault();
       if (!this.validPost()) {
         return;
       }

       if (!this.edit) {
         this.model.set(this.newAttributes());
       } else {
         this.model.set(this.editAttributes());
       }

   //    if (!this.edit) {
        let self = this;
        console.log('add');
         app.Collections.Posts.create(this.model, {
           wait: true,
           success: function(model, res) {
             console.log('success callback ' + res.insertedIds[0]);
             console.log(res);
             model.set({
               _id: res.insertedIds[0]
             });
             $.notify('Success ! Post added.', {
               className: 'success',
               style: 'bootstrap'
             });
             self.clear();
           },
           error: function(err) {
             console.log('error callback : ' + err);
           }
         });
       // } else {
       //   console.log('save');
       //   console.log(this.model.get('_id'));
       //   this.model.save({}, {
       //     success: function(model, res) {
       //       console.log('success callback ' + res.insertedIds[0]);
       //       $.notify('Success ! Post edited.', {
       //         className: 'success',
       //         style: 'bootstrap'
       //       });
       //     },
       //     error: function(err) {
       //       console.log('error callback : ' + err);
       //     }
       //   });
       //   // this.model.save({}, {
       //   //   success: function(model, res) {
       //   //     console.log('success callback ' + res.insertedIds[0]);
       //   //   },
       //   //   error: function(err) {
       //   //     console.log('error callback : ' + err);
       //   //   }
       //   // });
       // }


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
       this.$('.slug input').val(text);
     }

   });

 })();