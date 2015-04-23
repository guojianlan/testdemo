# testdemo
首先确定npm 源的问题，不行要把源改到 npm config set registry http://registry.cnpmjs.org
1. 环境安装
-------------------
* (1) 创建文件目录assets(里面有js,img,css,font),views(html文件),routes(路由初始化)，routesController(路由控制器),增加入口文件index.js,
* (2) 安装hapi, npm install hapi --save ,如果安装到全局，npm install hapi -g
2. index.js文件编写
-------------------
```
var Hapi = require('hapi'); //引入hapi http://hapijs.com
var Path = require('path'); //引入nodejs里面的path模块 https://nodejs.org/api/path.html
var server = new Hapi.Server(); // 创建服务
server.connection({
	port: 3000
});

require('./routes')(server); // 引入routes,并把创建的服务传过去
server.views({ // 配置一个模板引擎 http://hapijs.com/tutorials/views
	engines: { 
		'html': require('ejs') npm install ejs --save
	}, // 使用ejs引擎模板， 默认的加载是同步加载，compileMode:sysn,编译风格是同步
	path: Path.join(__dirname,'/views/'), //由于视图可以有文件在不同的位置，可以配置多个路径找东西，我们这里设置到/views/
	isCached: false  // 不设置缓存
});
server.start(function() { // 启动服务器
	console.log('Server running at:', server.info.uri); //输出url
});
```
-------------------
3. routes/index.js文件编写
-------------------
```
var routesController = require('../routesController').static; // 引入文件夹中的routesController/index.js中的static对象，赋值给变量routesController
module.exports = function(server) {
	server.route([{
		method: 'GET',
		path: '/{htmlPath*}', //访问地址参数
		handler: routesController.htmlFile //执行routesController.static.htmlFile方法
	}]);
}
```
-------------------
4. routesController/index.js文件编写
-------------------
```
var Controller = require('./Controller');//引入正式的路由控制
module.exports={
	static:Controller // 抛出对象，里面有static
}
```
-------------------
5. routesController/Controller.js文件编写
-------------------
```
var Path = require('path'); // 引入node里面的path模块
var fs = require('fs'); //引入node里面的fs(文件操作模块) https://nodejs.org/api/fs.html
var Boom = require('boom'); //npm install boom --save 引入错误处理机制
module.exports.htmlFile=function(req,rep){  //向index.js抛出htmlFile方法，接收request(请求),response（响应）
	var htmlPath = req.params.htmlPath; // 得到路由传过来得htmlPath
	var absPath = Path.join(__dirname,'../views/'+htmlPath); // 获取访问地址的文件
	var isExit = fs.existsSync(absPath); // 返回能否读取到文件
	return isExit ? rep.view(htmlPath) : rep(Boom.notFound('missing')); // 如果读取到文件则使用hapi.view(),输出到页面上，否则使用boom抛出异常
}
```
-------------------