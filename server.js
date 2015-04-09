var Hapi = require('hapi');

var server = new Hapi.Server();

var dbConfig = {
	"url": "mongodb://localhost:27017/aa-summit",
	"settings": {
		"db": {
			"native_parser": false //native parser is deprecated let's set this to false :)
		}
	}
};

var users = {
	test: {
		id: '1',
		password: 'password',
		name: 'TEST'
	}
};

var login = function(request, reply) {

	if (request.auth.isAuthenticated) {
		return reply({
			success: true,
			user: {
				id: '1',
				password: 'password',
				name: 'TEST'
			}
		});
	}

	var message = '';
	var account = null;

	if (request.method === 'post') {

		if (!request.payload.username ||
			!request.payload.password) {

			message = 'Missing username or password';
		} else {
			account = users[request.payload.username];
			if (!account ||
				account.password !== request.payload.password) {

				message = 'Invalid username or password';
			}
		}
	}

	if (request.method === 'get' ||
		message) {

		return reply({
			success: true,
			message: message
		});
	}

	request.auth.session.set(account);
	return reply({
		success: true,
		user: account
	});
};

var logout = function(request, reply) {

	request.auth.session.clear();
	reply({
		success: true
	});
};


server.connection({
	port: 3000
});

server.register(require('hapi-auth-cookie'), function(err) {

	server.auth.strategy('session', 'cookie', {
		password: 'secret',
		cookie: 'sid-example',
		isSecure: false
	});
});


server.route([{
	method: ['GET', 'POST'],
	path: '/login',
	config: {
		handler: login,
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		plugins: {
			'hapi-auth-cookie': {
				redirectTo: false
			}
		}
	}
}, {
	method: 'GET',
	path: '/logout',
	config: {
		handler: logout,
		auth: 'session'
	}
}, {
	method: "GET",
	path: "/{param*}",
	handler: {
		directory: {
			path: "./public",

		}
	},
	config: {
		auth: false
	}
}]);


var plugins = [{
	register: require('hapi-mongodb'),
	options: dbConfig
}];


server.register(plugins, function(err) {
	if (err) {
		throw err;
	}
	server.start(function() {
		console.log('info', 'Server running at ', server.info.uri);
	});
});