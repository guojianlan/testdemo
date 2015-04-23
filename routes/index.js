var routesController = require('../routesController').static;
module.exports = function(server) {
	server.route([{
		method: 'GET',
		path: '/{htmlPath*}',
		handler: routesController.htmlFile
	}, {
		method: 'GET',
		path: '/css/{cssPath*}',
		handler: routesController.cssFile
	}, {
		method: 'GET',
		path: '/img/{imgPath*}',
		handler: routesController.imgFile
	}, {
		method: 'GET',
		path: '/js/{jsPath*}',
		handler: routesController.jsFile
	}]);
}