'use strict'

define ['can', 'scripts/logoutModel', 'scripts/developerModel'], 
(can, LogoutModel, DeveloperModel) ->

	can.Component.extend
		tag: 'home-component'
		template : can.view 'views/home.mustache'
		scope:
			developers : new can.List []
			logout : ->
				deferred = LogoutModel.findOne()

				deferred.then (response) ->
					if response.success is true
						can.route.attr 'route', 'login'
				, (xhr) ->
					console.log 'error on request'
					
			getAllDevelopers : ->
				self = @
				deferred = DeveloperModel.findAll()

				deferred.then (response) ->
					if response.success is true
						self.developers.replace response
				, (xhr) ->
					if xhr.status is 401
						can.route.attr 'route', 'login'
