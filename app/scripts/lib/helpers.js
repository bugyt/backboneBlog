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
      console.log(view);
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

    form.find('input,textarea').each(function() {
      var field = $(this);
      valid = app.Helpers.inputValid(field) && valid;
    });

    form.find('button[type="submit"]').prop('disabled', !valid);

    return valid;

  },

  position: {},
  slugify: function(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  },


  editableLabel: function(form) {
    var defaultText = '';

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
  },

  generateTabs: function(viewsList) {

    var tabs = $('<div/>').addClass('tab-content');
    var navTabs = $('<ul/>').addClass('nav nav-tabs').attr('role', 'tablist');
    var errMsg;

    var valid = viewsList.every(function(element) {

      try {
        var subView = new app.Views[element]();
      } catch (err) {
        errMsg = $('<div/>').html('<p>Error on subview' + err + '</p>');
        return false;
      }

      var li = $('<li/>').attr('role', 'presentation')
        .appendTo(navTabs).addClass(function() {
          if ($(this).is(':first-child')) {
            return 'active';
          }
        });
      $('<a/>')
        .attr('aria-controls', element)
        .attr('data-toggle', 'tab')
        .attr('role', 'tab')
        .attr('href', '#' + element)
        .text(subView.title).click(function(e) {
          e.preventDefault();
          $(this).tab('show');
        })
        .appendTo(li);
      $('<div/>')
        .addClass('tab-pane')
        .attr('role', 'tabpanel')
        .attr('id', element)
        .appendTo(tabs).addClass(function() {
          if ($(this).is(':first-child')) {
            return 'active';
          }
        })
        .append(subView.render().$el);

        return true;

    });

    return (valid) ? $('<div/>').append(navTabs).append(tabs) : errMsg;
  }


};