(function() {
  'use strict';
  define(['can', 'scripts/logoutModel', 'scripts/developerModel'], function(can, LogoutModel, DeveloperModel) {
    return can.Component.extend({
      tag: 'home-component',
      template: can.view('views/home.mustache'),
      scope: {
        developers: new can.List([]),
        logout: function() {
          var deferred;
          deferred = LogoutModel.findOne();
          return deferred.then(function(response) {
            if (response.success === true) {
              return can.route.attr('route', 'login');
            }
          }, function(xhr) {
            return console.log('error on request');
          });
        },
        getAllDevelopers: function() {
          var deferred, self;
          self = this;
          deferred = DeveloperModel.findAll();
          return deferred.then(function(response) {
            if (response.success === true) {
              return self.developers.replace(response);
            }
          }, function(xhr) {
            if (xhr.status === 401) {
              return can.route.attr('route', 'login');
            }
          });
        }
      }
    });
  });

}).call(this);
