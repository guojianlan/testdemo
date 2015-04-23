var routesController = require('../routesController').static;
module.exports = function(server) {
	server.route([{
		method: 'GET',
		path: '/{htmlPath*}',
		handler: routesController.htmlFile
	}]);
}