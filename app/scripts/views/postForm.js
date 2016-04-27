 'use strict';

 (function() {

   app.Views.PostForm = Mn.ItemView.extend({

     template: _.template(JST.postForm),
     tagName: 'form',
     className: 'form-horizontal',
     attributes: {
       role: 'form'
     },
     title: 'Add a post',
     name: 'postform',

     events: {
       'click button[type="submit"]': 'createPost',
       'click button[type="reset"]': 'clear',
       'input input,textarea': 'validPost',
       'input #title': 'convertToSlug'

     },

     initialize: function() {
       this.model = this.model || new app.Models.Post();
       this.listenTo(this.model, 'sync', this.render);

       // _.bindAll(this.model, 'change', 'render');
       //_.bindAll(this.model, 'sync', 'render');
     },

     render: function() {
       console.log("postform render");

       if (this.model.id === undefined) {

         this.title = 'Add a post';
         this.$('button[type="submit"]').html('Add');

       } else {

         this.title = 'Update a post';
         this.$('button[type="submit"]').html('Update');
       }
       var html = this.template(this.model.toJSON());
       //this.setElement(html);
       this.$el.html(html);
       app.Helpers.editableLabel(this.$el);
       this.validPost();
       this.triggerMethod('render:end', 'form');
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
       } else {
         if (this.model._id !== null) {
           this.model.set(this.newAttributes());
         } else {
           this.model.set(this.editAttributes());
         }
         var self = this;
         app.postsController.createPost(this.model).then(function() {
           console.log('then');
           console.log(self.model.get('_id'));
         });
       }

     },

     validPost: function() {
       return app.Helpers.formValid(this.$el);
     },

     clear: function(e) {
       //  e.preventDefault();
       this.model = this.initModel;
       this.render();
     },

     convertToSlug: function(e) {
       var target = $(e.target);
       var text = app.Helpers.slugify(target.val());
       this.$('.slug label:not(.control-label)').text(text);
       this.$('.slug input').val(text);
     }

   });

 })();