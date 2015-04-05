exports.register = function(server, options, next) {
	server.route([{
		method: 'GET',
		path: '/test',
		handler: function(request, reply) {
			reply({
				message: 'testing route'
			});
		}
	}, {
		method: 'GET',
		path: '/test/{id}',
		handler: function(request, reply) {
			reply({
				message: 'fetching item with id: ' + encodeURIComponent(request.params.id)
			});
		}
	}]);

	next();
};

exports.register.attributes = {
	name: 'test-routes',
	version: '0.0.1'
};