(function() {
  'use strict';
  define(['can', 'scripts/loginModel'], function(can, LoginModel) {
    return can.Component.extend({
      tag: 'login-form',
      template: can.view('views/login.mustache'),
      scope: {
        user: {
          username: '',
          password: ''
        },
        login: function(ev, el) {
          var deferred;
          deferred = LoginModel.create(this.attr('user').serialize());
          return deferred.then(function(response) {
            if (response.success === true) {
              return can.route.attr('route', 'home');
            }
          }, function(xhr) {
            return console.log('error on request');
          });
        }
      }
    });
  });

}).call(this);
