'use strict'

require ['can', 'scripts/loginComponent', 'scripts/homeComponent', 'scripts/loginModel'], (can, LoginComponent, HomeComponent, LoginModel) ->

    Router = can.Control.extend

        init : (element, options) ->
            #TODO:make request to check if user is logged in
            #add bind to route change and check as well on every route change if user is authenticated before rendering content.
            @options.userMap = new can.Map(
                    user : ''
                )
            self = @
            can.route.bind 'change', (ev, attr, how, newVal, oldVal) ->
               if newVal isnt 'login'
                    self.checkUserAuthentication()
            
        checkUserAuthentication : ->
            self = @
            deferred = LoginModel.findOne()

            deferred.then (response) ->
                if response.success is false
                    can.route.attr(route:'login')
                else
                    self.options.userMap.attr 'user', response.name
            ,(xhr) ->
                console.log 'error on request'

        'route' : (data) ->
            #default route
            window.location.hash = '#!login'

        'login route' : (data) ->
            component = can.mustache '<login-form></login-form>'
            can.$('.main-container').html component()

        'home route' : (data) ->
            #user is already authenticated
            self = @
            component = can.mustache "<home-component user='user'></home-component>"
            can.$('.main-container').html component(
                user : self.options.userMap
            )

    $(document).ready ->
        new Router(can.$('body'))
        can.route.ready()
