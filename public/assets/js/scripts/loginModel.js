(function() {
  'use strict';
  define(['can'], function(can) {
    var LoginModel;
    return LoginModel = can.Model.extend({
      create: function(attrs) {
        return $.post('http://localhost:3000/login', attrs);
      }
    }, {});
  });

}).call(this);
