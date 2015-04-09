'use strict'

define ['can'], (can) ->

	can.Component.extend
		tag: 'home-component'
		template : can.view 'views/home.mustache'