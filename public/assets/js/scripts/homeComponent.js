(function() {
  'use strict';
  define(['can', 'scripts/loginModel'], function(can, LoginModel) {
    return can.Component.extend({
      tag: 'home-component',
      template: can.view('views/home.mustache')
    });
  });

}).call(this);
