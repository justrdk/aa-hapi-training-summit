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
		name: 'Osman'
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

var getAuthenticatedUser = function(request, reply) {
	if (request.auth.credentials && request.auth.credentials.name) {
		reply({
			success: true,
			name: request.auth.credentials.name
		});
	} else {
		reply({
			success: false,
			message: 'no user authenitcated'
		});
	}
};

var getAllDevelopers = function(request, reply) {
	var collection = "developers";
	var db = request.server.plugins['hapi-mongodb'].db;

	db.collection(collection).find().toArray(function(err, doc) {
		if (err) {
			return reply({
				success: false,
				error: 'Internal MongoDB error'
			});
		}
		reply({
			success: true,
			data: doc
		});
	});
};

server.connection({
	port: 3000
});

var plugins = [{
	register: require('hapi-mongodb'),
	options: dbConfig
}];

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
	path: "/getAuthenticatedUser",
	handler: getAuthenticatedUser,
	config: {
		auth: {
			mode: "optional",
			strategy: "session"
		}
	}
}, {
	method: "GET",
	path: "/getAllDevelopers",
	handler: getAllDevelopers,
	config: {
		auth: {
			mode: "required",
			strategy: "session"
		}
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

server.register(plugins, function(err) {
	if (err) {
		throw err;
	}
	server.start(function() {
		console.log('info', 'Server running at ', server.info.uri);
	});
});
