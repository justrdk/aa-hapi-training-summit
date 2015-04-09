(function() {
  'use strict';
  define(['can'], function(can) {
    return can.Component.extend({
      tag: 'home-component',
      template: can.view('views/home.mustache')
    });
  });

}).call(this);
