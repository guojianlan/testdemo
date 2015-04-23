# testdemo
首先确定npm 源的问题，不行要把源改到 npm config set registry http://registry.cnpmjs.org
1. 环境安装
-------------------
* (1) 创建文件目录assets(里面有js,img,css,font),views(html文件),routes(路由初始化)，routesController(路由控制器),增加入口文件index.js,
* (2) 安装hapi, npm install hapi --save ,如果安装到全局，npm install hapi -g
2.index.js文件编写
-------------------
var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server();
server.connection({
	port: 3000
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
-------------------
