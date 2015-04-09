'use strict'

define ['can', 'scripts/loginModel'], (can, LoginModel) ->

	can.Component.extend
		tag : 'login-form'
		template : can.view 'views/login.mustache'
		scope : 
			user :
				username : ''
				password : ''
			login : (ev, el) ->
				deferred = LoginModel.create(@attr('user').serialize())
				deferred.then (response) ->
					if response.success is true
						can.$('body').data().controls[0].options.user(response.user)
						window.location.hash = '#!home'
				, (xhr) ->
					console.log 'error on request'