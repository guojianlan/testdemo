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
	}, {
		method: 'GET',
		path: '/css/{cssPath*}',//访问css地址参数
		handler: routesController.cssFile //执行routesController.static.cssFile方法
	}, {
		method: 'GET',
		path: '/img/{imgPath*}',//访问img地址参数
		handler: routesController.imgFile //执行routesController.static.imgFile方法
	}, {
		method: 'GET',
		path: '/js/{jsPath*}',//访问js地址参数
		handler: routesController.jsFile//执行routesController.static.jsFile方法
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
var gulp = require('gulp'); //引入gulp插件
var rimraf = require('gulp-rimraf'); // 引入gulp-rimraf 插件，操作文件夹
var jsxLoader = require('jsx-loader'); // 引入jsx-loader插件，以便webpack读取jsx文件时使用
module.exports.htmlFile=function(req,rep){  //向index.js抛出htmlFile方法，接收request(请求),response（响应）
	var htmlPath = req.params.htmlPath; // 得到路由传过来得htmlPath
	var absPath = Path.join(__dirname,'../views/'+htmlPath); // 获取访问地址的文件
	var isExit = fs.existsSync(absPath); // 返回能否读取到文件
	return isExit ? rep.view(htmlPath) : rep(Boom.notFound('missing')); // 如果读取到文件则使用hapi.view(),输出到页面上，否则使用boom抛出异常
};
module.exports.cssFile = function(req, rep) {
	var cssPath = req.params.cssPath; // 得到路由传过来得cssPath
	var absPath = Path.join(__dirname, '../assets/css/' + cssPath);// 获取访问地址的文件
	var isExit = fs.existsSync(absPath);// 返回能否读取到文件
	if (isExit) {
		var ReadStream = fs.createReadStream(absPath);
		return rep(ReadStream).type('text/css; charset=utf-8');
	} else {
		return rep(Boom.notFound('missing'))使用boom抛出异常
	}
};
module.exports.imgFile = function(req, rep) {
	var imgPath = req.params.imgPath; // 得到路由传过来得imgPath
	var absPath = Path.join(__dirname, '../assets/img/' + imgPath);// 获取访问地址的文件
	var isExit = fs.existsSync(absPath);// 返回能否读取到文件
	return isExit ? rep.file(absPath) : rep(Boom.notFound('missing')); // 如果读取到文件则使用hapi.file(),输出到页面上，否则使用boom抛出异常
};
module,exports.jsFile = function(req,rep){
	var jsPath = req.params.jsPath;// 得到路由传过来得jsPath
	var absPath = Path.join(__dirname,'../assets/js/'+jsPath);// 获取访问地址的文件
	var desPath = Path.join(__dirname,'../assets/js/'+jsPath.replace(/\.js/g,'.dev.js'));//生成dev.js
	var isExit = fs.existsSync(absPath);// 返回能否读取到文件
	if(isExit){
		if(jsPath.match(/vender/g)){ 
			return rep.file(absPath) // 如果读取的是vender路径,则直接输出文件
		}
		gulp.src(desPath).pipe(rimraf()); //删除dev.js 文件
		var gulpStream = gule.src(abspath)
		.pipe(webpack({
			module:{
				loaders:[{
						test: /\.jsx$/, // webpack 配置,当使用.jsx的时候，使用jsx-loader编译
						loader: 'jsx-loader?insertPragma=React.DOM&harmony'
					}]		
			},
			debug: true, 使用debug
			devtool: '#eval', // 使用veal 开头
			resolve: {
				extensions: ['', '.js', '.jsx'] // 用于指明程序自动补全识别哪些后缀
			}
		}))
		.pipe(rename(Path.basename(desPath))) //使用当前文件路径为文件名
		.once('data',function(file){ 
			rep(file.contents).type('application/javascript'); // 读取一次文件并使用js生成
		});
	}else{
		rep(Boom.notFound('missing'));使用boom抛出异常
	}
};
```
-------------------
