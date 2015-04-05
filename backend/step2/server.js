var Hapi = require('Hapi');
var server = new Hapi.Server();

server.connection({
	port: 3000
});

var plugins = [{
	register: require('./routes.js')
}];

server.register(plugins, function(err) {
	if (err) {
		throw err;
	}

	server.start(function() {
		console.log('info', 'Server running at ', server.info.uri);
	});
});