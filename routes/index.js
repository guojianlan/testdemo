var routesController = require('../routesController').static;
var fs =require('fs');
var Path = require('path');
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
	},{
		method: 'GET',
		path: '/dist/{filePath*}',
		handler: routesController.packFile
	},{
		method: 'GET',
		path: '/h5/demo.json',
		handler: function(req,rep){
			var absPath = Path.join(__dirname,'../assets/js/h5/reactModule/demo.json')
			rep.file(absPath);
			
		}
	}]);
}