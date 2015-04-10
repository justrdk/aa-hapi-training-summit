'use strict'

define ['can', 'scripts/loginModel'], (can, LoginModel) ->

	can.Component.extend
		tag: 'home-component'
		template : can.view 'views/home.mustache'
