'use strict'

define ['can'], (can) ->

	LoginModel = can.Model.extend
		findAll : 'GET /getAllDevelopers'
	, {}
