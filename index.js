var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();
server.connection({
	port: 3000,
	hostname:'http:127.0.0.1'
});

require('./routes')(server);
server.views({
	engines: {
		'html': require('ejs')
	},
	path: Path.join(__dirname,'/views/'),
	isCached: false
});
server.start(function() {
	console.log('Server running at:', server.info.uri);
});