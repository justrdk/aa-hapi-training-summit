(function() {
  'use strict';
  require(['can', 'scripts/loginComponent', 'scripts/homeComponent', 'scripts/loginModel'], function(can, LoginComponent, HomeComponent, LoginModel) {
    var Router;
    Router = can.Control.extend({
      init: function(element, options) {
        var self;
        this.options.userMap = new can.Map({
          user: ''
        });
        self = this;
        return can.route.bind('change', function(ev, attr, how, newVal, oldVal) {
          if (newVal !== 'login') {
            return self.checkUserAuthentication();
          }
        });
      },
      checkUserAuthentication: function() {
        var deferred, self;
        self = this;
        deferred = LoginModel.findOne();
        return deferred.then(function(response) {
          if (response.success === false) {
            return can.route.attr({
              route: 'login'
            });
          } else {
            return self.options.userMap.attr('user', response.name);
          }
        }, function(xhr) {
          return console.log('error on request');
        });
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
        var component, self;
        self = this;
        component = can.mustache("<home-component user='user'></home-component>");
        return can.$('.main-container').html(component({
          user: self.options.userMap
        }));
      }
    });
    return $(document).ready(function() {
      new Router(can.$('body'));
      return can.route.ready();
    });
  });

}).call(this);
