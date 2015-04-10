'use strict'

require ['can', 'scripts/loginComponent', 'scripts/homeComponent', 'scripts/loginModel'], 
(can, LoginComponent, HomeComponent, LoginModel) ->

    Router = can.Control.extend

        init : (element, options) ->
            self = @
            @options.userMap = new can.Map(
                    user : '')

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
            can.route.attr 'route', 'login'

        'login route' : (data) ->
            component = can.mustache '<login-form></login-form>'
            can.$('.main-container').html component()

        'home route' : (data) ->
            self = @
            component = can.mustache "<home-component usermap='user'></home-component>"
            can.$('.main-container').html component(
                user : self.options.userMap)

    $(document).ready ->
        new Router(can.$('body'))
        can.route.ready()
