exports.register = function(server, options, next) {

	var collection = 'developers';

	/**
	 * [getDeveloperHandler to set on route to fetch item from collection depending of id sent on request]
	 * @param  {[object]} request [request object]
	 * @param  {[object]} reply   [reply object]
	 * @return {[mongo object]} the match object on the collection
	 * will return the object match by id on the mongo collection
	 */
	var getDeveloperHandler = function(request, reply) {
		var db = request.server.plugins['hapi-mongodb'].db;
		var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;
		var requestID = request.params.id;
		//id to use cause of my personal mongo collection "5520e1db629be3f3ed91d2ec", this varies on your local collection
		db.collection(collection).findOne({
			"_id": new ObjectID(requestID)
		}, function(err, result) {
			if (err) {
				return reply({
					error: 'Internal MongoDB error'
				});
			}
			reply(result);
		});
	};

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
		path: '/developer/{id}',
		handler: getDeveloperHandler
	}]);

	next();
};

exports.register.attributes = {
	name: 'mongo-routes',
	version: '0.0.1'
};