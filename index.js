var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();
server.connection({
	port: 3000
});


server.route([{
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		reply('Hello!');
	}
}, {
	method: 'GET',
	path: '/{htmlpPath*}',
	handler: function(request, reply) {
		var htmlpPath = request.params.htmlpPath;
		var absPath = Path.join(__dirname, '/views/' + htmlpPath);
		//reply.view(absPath);
		console.log(Path.join(__dirname,'/views'));
		console.log(absPath);
		reply.view(absPath);
	}
}]);

server.views({
	engines: {
		'html': require('ejs')
	},
	path: Path.join(__dirname,'/views'),
	isCached: false
});
server.start(function() {
	console.log('Server running at:', server.info.uri);
});