'use strict';

app.Helpers = {

  ViewManager: {
    currentView: null,
    previousView: null,
    showView: function(view) {
      this.previousView = this.currentView;
      if (this.currentView !== null && this.currentView.cid !== view.cid) {
        this.currentView.remove();
      }
      this.currentView = view;
      return view;
    }
  },

  inputValid: function(field) {

    if (field.prop('required') && (field.val().trim() === '' || !app.Helpers.inputPattern(field))) {
      field.parents('.form-group').removeClass('has-success').addClass('has-error');
      field.siblings('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove');
      return false;
    } else {
      if (field.prop('required')) {
        field.parents('.form-group').removeClass('has-error').addClass('has-success');
        field.siblings('.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok');
      } else {
        field.parents('.form-group').removeClass('has-error').removeClass('has-success');
        field.siblings('.glyphicon').removeClass('glyphicon-remove').removeClass('glyphicon-ok');
      }
      
      return true;
    }

  },

  inputPattern: function(field) {
    return !field.attr('pattern') || field.val().match(new RegExp(field.attr('pattern')));

  },

  formValid: function(form) {

    var valid = true;

    this.editableLabel(form);
    form.find('input,textarea').each(function() {
      var field = $(this);
      valid = app.Helpers.inputValid(field) && valid;
    });

    form.find('button[type="submit"]').prop('disabled', !valid);

    return valid;

  },

  position: {},

  convertToSlug: function(Text) {
    return Text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '_');
  },

  editableLabel: function(form) {
    var defaultText = 'Click me and enter some text';

    function endEdit(e) {
      var input = $(e.target),
        label = input && input.prev();

      label.text(input.val() === '' ? defaultText : input.val());
      input.hide();
      label.show();
    }

    form.find('.clickedit').hide()
      .focusout(endEdit)
      .keyup(function(e) {
        console.log('rhoooo');
        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
          
          endEdit(e);
          return false;
        } else {
          return true;
        }
      })
      .prev().dblclick(function() {
        $(this).hide();
        $(this).next().show().focus();
      });
  }


};