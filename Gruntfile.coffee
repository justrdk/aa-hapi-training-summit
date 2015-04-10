'use strict'

module.exports = (grunt) ->

	grunt.initConfig
		pkg: '<json:package.json>'
		coffee:
			dist:
				files: [
						expand: true
						flatten: true
						cwd: 'coffeefiles/'
						src: ['**/*.coffee']
						dest: 'public/assets/js/scripts/'
						ext: '.js'
				]
		clean: ["public/assets/js/scripts/",]
		watch:
			scripts:
				files:['public/assets/js/main.js', 'coffeefiles/*.coffee']
				tasks: ['clean', 'coffee']
				options:
					spawn: false

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-coffee')

	grunt.registerTask 'deploywatch', ['clean', 'coffee','watch']
	grunt.registerTask 'deploy', ['clean', 'coffee']
