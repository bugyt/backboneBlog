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

  generateNavTabs: function(viewsList, options) {

    options = options || {};

    let tabs = $('<div/>').addClass('tab-content');
    var navTabs = $('<ul/>').addClass('nav nav-tabs nav-justified').attr('role', 'tablist');
    var errMsg;

    var valid = viewsList.every(function(element) {

      try {
        var subView = new app.Views[element](options);
      } catch (err) {
        errMsg = $('<div/>').html('<p>Error on subview' + err + '</p>');
        return false;
      }

      var li = $('<li/>').attr('role', 'presentation')
        .appendTo(navTabs).addClass(function() {
          if ((options.active && options.active === element) || !options.active && $(this).is(':first-child')) {
            return 'active';
          }
        });
      $('<a/>')
        .attr('aria-controls', element)
        .attr('data-toggle', 'tab')
        .attr('role', 'tab')
        .attr('href', '#' + element)
        .attr('data-url', '#/admin')
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
          if ((options.active && options.active === element) || !options.active && $(this).is(':first-child')) {
            return 'active';
          }
        })
        .append(subView.$el);

      return true;

    });
    return (valid) ? $('<div/>').append(navTabs).append(tabs) : errMsg;
  },

  formatLocalDate: function(now) {
    //var now = new Date();
    //var tzo = -now.getTimezoneOffset();
    //var dif = tzo >= 0 ? '+' : '-';
    var pad = function(num) {
      var norm = Math.abs(Math.floor(num));
      return (norm < 10 ? '0' : '') + norm;
    };
    return now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + ' ' + pad(now.getHours()) +
      ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()); //+ dif + pad(tzo / 60) + ':' + pad(tzo % 60);
  },

  notifyMe: function(text) {

    var notification;
    // Voyons si le navigateur supporte les notifications
    if (!('Notification' in window)) {
      console.log('Ce navigateur ne supporte pas les notifications desktop');
    }

    // Voyons si l'utilisateur est OK pour recevoir des notifications
    else if (Notification.permission === 'granted') {
      // Si c'est ok, créons une notification
      notification = new Notification(text);
    }

    // Sinon, nous avons besoin de la permission de l'utilisateur
    // Note : Chrome n'implémente pas la propriété statique permission
    // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function(permission) {

        // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
        if (!('permission' in Notification)) {
          Notification.permission = permission;
        }

        // Si l'utilisateur est OK, on crée une notification
        if (permission === 'granted') {
          notification = new Notification(text);
        }
      });
    }

    // Comme ça, si l'utlisateur a refusé toute notification, et que vous respectez ce choix,
    // il n'y a pas besoin de l'ennuyer à nouveau.
  }


};