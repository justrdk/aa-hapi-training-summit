var Hapi = require('Hapi');
var server = new Hapi.Server();

//local mongodb configuration
var dbConfig = {
	"url": "mongodb://localhost:27017/aa-summit",
	"settings": {
		"db": {
			"native_parser": false //native parser is deprecated let's set this to false :)
		}
	}
};

server.connection({
	port: 3000
});

var plugins = [{
	register: require('./routes.js') //register routes
}, {
	register: require('hapi-mongodb'), //register hapi-mongod plugin so we can query mongodb
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