var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({
	port: 3000
});

server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
        reply({name:'Testing route test'});
    }
});

server.start(function() {
	console.log('Server running at:', server.info.uri);
});