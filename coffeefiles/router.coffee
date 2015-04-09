'use strict'

require ['can', 'scripts/loginComponent', 'scripts/homeComponent'], (can, LoginComponent, HomeComponent) ->

    Router = can.Control.extend

        init : (element, options) ->
            #TODO:make request to check if user is logged in
            #add bind to route change and check as well on every route change if user is authenticated before rendering content.
            @options.user = can.compute {}
        'route' : (data) ->
            #default route
            window.location.hash = '#!login'

        'login route' : (data) ->
            component = can.mustache '<login-form></login-form>'
            can.$('.main-container').html component()

        'home route' : (data) ->
            #user is already authenticated
            component = can.mustache "<home-component username='user'></home-component>"
            can.$('.main-container').html component({
                    user : @options.user().name
                })

    $(document).ready ->
        new Router(can.$('body'))
        can.route.ready()
