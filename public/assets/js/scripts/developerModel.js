(function() {
  'use strict';
  define(['can'], function(can) {
    var LoginModel;
    return LoginModel = can.Model.extend({
      findAll: 'GET /getAllDevelopers'
    }, {});
  });

}).call(this);
