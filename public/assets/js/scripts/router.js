(function() {
  'use strict';
  require(['can', 'scripts/loginComponent', 'scripts/homeComponent'], function(can, LoginComponent, HomeComponent) {
    var Router;
    Router = can.Control.extend({
      init: function(element, options) {
        return this.options.user = can.compute({});
      },
      'route': function(data) {
        return window.location.hash = '#!login';
      },
      'login route': function(data) {
        var component;
        component = can.mustache('<login-form></login-form>');
        return can.$('.main-container').html(component());
      },
      'home route': function(data) {
        var component;
        component = can.mustache("<home-component username='user'></home-component>");
        return can.$('.main-container').html(component({
          user: this.options.user().name
        }));
      }
    });
    return $(document).ready(function() {
      new Router(can.$('body'));
      return can.route.ready();
    });
  });

}).call(this);
