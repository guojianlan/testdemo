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
var rename = require('gulp-rename'); //引入gulp-rename,改名字
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
6. assets/js/demo/index.js文件编写
-------------------
```
require('./config'); // 引入当前文件夹config.js
```
-------------------
7. assets/js/demo/config.js文件编写
-------------------
```
require('./modules'); 引入当前文件夹modules/index.js
```
-------------------
8. assets/js/demo/modules/index.js文件编写
-------------------
```
require('./indexmodule')(); //执行当前文件夹下面的indexmodule
```
-------------------
9. assets/js/demo/modules/indexmodule.js文件编写
-------------------
```
var testmodule = require('./test/testmodule'); //引入当前文件夹下面的/test/testmodule.js
var indexmodule = module.exports = function(){
	(function(){
		indexmodule.init(); //函数自执行
	})();
	return indexmodule;
};
indexmodule.init = function(){
	console.log(123123123); //输出123131332
	new testmodule(); new testmodule实例
};
```
-------------------
9. assets/js/demo/modules/test/testmodule.js文件编写
-------------------
```
var testmodule = module.exports = function(){
	this.init(); //new 实例的时候执行init,输出woca
};
var p = testmodule.prototype;

p.init = function(){
	console.log('woca');
}

```
-------------------
10. 引入lodash和html-loader npm install lodash html-loader --save
-------------------
* (1) 创建文件，在assets/js/demo/module/lodashmodule/lodashModule.js // 要往indexmodule.js添加var lodashModule=require('./lodashmodule/lodashModule'); 然后new lodashModule();
```
var _ = require('lodash'); // 引入lodash
var $ =require('jquery'); // 引入jquery
var lodashtemplate = require('html!./lodashdemo.html'); // 使用html-loader 引入lodashdemo.html
var lodashModule = module.exports = function(){ 
	this.init(); //调用init
};

var p = lodashModule.prototype;

p.init=function(){
	console.log('goto render');
	this.render(); // 调用render
};

p.render = function(){
	if(_.isFunction(this.beforeRender)) this.beforeRender(); // 使用loadsh的isFunction 判断是否是function 调用beforeRender
	if(_.isFunction(this.afterRender)) this.afterRender();// 使用loadsh的isFunction 判断是否是function afterRender
};

p.beforeRender=function(){
	console.log('goto templateRender');
	this.templateRender(); // 调用templateRender
};
p.templateRender = function(){
	var compiled = _.template(lodashtemplate); // 使用lodash的template方法，解释出文件
	$('div').append(compiled({
		test:111
	})); // 往div里面添加元素，并把 test 传给lodashdemo.html
}

p.afterRender=function(){
	console.log('render end');
};

```
* (2) 创建文件，在assets/js/demo/module/lodashmodule/lodashdemo.html
```
<div><%= test%></div> 把js里面传过来的test 写到文件中

```
-------------------
10. 引入gulp构建项目 npm install gupe --save
-------------------
* (1) 创建文件，testdemo/gulpfile.js

```
var gulp = require('gulp'); //引入基础库gulp 
var webpack = require('gulp-webpack');//引入gulp-webpack,一个使用command规范的模块工具 
var rename = require('gulp-rename'); //引入gulp-rename,更改名字
var rimraf = require('rimraf'); // 引入rimraf,处理文件夹
var imgmin = require('gulp-imagemin'); // 引入gulp-imagemin,处理图片
var concat = require('gulp-concat'); // 引入gulp-concat ,处理文件合并
var minifyCss = require('gulp-minify-css'); //引入gulp-minify-css,处理css最小化
var uglify = require('gulp-uglify'); //引入gulp-uglisy,代码丑化
var fs = require('fs');
var rev = require('gulp-rev');// 引入文件版本控制
gulp.task('clear', function() { // 创建gulp任务（clear）,删除dist下的所有文件
	rimraf('./dist', function() {
		console.log('clear success');
	});
});
gulp.task('demo', function() { // 创建gulp任务（demo）
	rimraf('./dist', function() { //删除dist文件夹下面的使用内容
		gulp.src(['./assets/img/demo/*']) // 找到assets/img/demo/下面的所有文件
			.pipe(imgmin({ // 优化图片
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest('./dist/img/demo/')); // 生成到dist/img/demo下面

		gulp.src(['./assets/css/demo/*.css', './assets/css/common/*.css']) //找到assets/css/demo下面的css和assets/css/common下面的css
			.pipe(concat('demo.min.css')) // 合并，并且命名为demo.min.css
			.pipe(minifyCss()) //最小化css
			.pipe(gulp.dest('./dist/css/demo/')); // 生成在dist/css/demo文件下

		gulp.src(['./assets/js/vendor/*.js']) // 找到assets/js/vendor下面的所有js
		.pipe(uglify()) //丑化里面的代码
		.pipe(gulp.dest('./dist/js/vendor/')); //生成到dist/js/vendor下面

		if(fs.existsSync('./assets/js/demo/index.js')){ // 判断assets/js/demo/index.js是否存在
			gulp.src('./assets/js/demo/index.js') // 找到assets/js/demo/index.js
			.pipe(webpack()) //使用webpack打包
			.pipe(rename('index.min.js')) //更改文件名为index.min.js
			.pipe(uglify()) // 代码丑化
			.pipe(gulp.dest('./dist/js/demo/')); // 生成在dist/js/demo
		}
	});
});
gulp.task('demo-rev', function() { // 创建gulp任务（demo-rev）
  // rev version
  	gulp.src(['./dist/js/demo/*.js', './dist/css/demo/*.css'], { // 找到dist/js/demo下面的所有js,和dist/css/demo下面的所有css
      base: './dist' 
    })
    .pipe(rev()) //增加版本
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest('./dist/manifest.json', {
      base: './dist' //生成mainfest.json
    }))
    .pipe(gulp.dest('./dist'));放在dist目录下
});


```
-------------------
11.使用angular.js npm install angular --save
* (1) 首先在demo/config.js加入require('angular');
-------------------
```
window.$ =require('jquery');
require('angular');
require('./modules');
```
* (2) 然后在demo/modules/indexmodule.js 引入
```
var testmodule = require('./test/testmodule');
var lodashmodule = require('./lodashmodule/lodashModule');
require('./angularDemo/angularModule'); // 引入angular模块
var indexmodule = module.exports = function(){
	(function(){
		indexmodule.init();
	})();
	return indexmodule;
};
indexmodule.init = function(){
	console.log(123123123);
	new testmodule();
	new lodashmodule();
};
```
* (3) 然后创建一下demo/modules/angularDemo/angularModule.js
```
require('angular');
var testController = require('./testController.js')();
var app = angular.module('test', []);
app.controller('testController', testController);

```
* (4) 最后创建一下demo/modules/angularDemo/testController.js
```
module.exports = function() {
	return ['$scope', function($scope) {
		$scope.items = [{
			title: 'Paint pots',
			quantity: 8,
			price: 3.95
		}, {
			title: 'Polka dots',
			quantity: 17,
			price: 12.95
		}, {
			title: 'Pebbles',
			quantity: 5,
			price: 6.95
		}];
	}];
};
```
* (5) 修改views/demo/demo.html
```
<!doctype html>
<html lang="en" ng-app='test'>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="http://127.0.0.1:3000/css/demo/index.css">
</head>
<body>
	<div>1</div>
	<div> <img src="http://127.0.0.1:3000/img/demo/cm-icon.png" alt="ss"></div>
	<span>{{2+1}}</span>
	    <div ng-controller='testController'>
         <div ng-repeat='item in items'>
            <span >{{item.title}}</span>
            <input type="text" ng-model='item.quantity'>
            <span>{{item.price | currency}}</span>
            <span>{{item.price *item.quantity | currency}}</span>
            <button ng-click='remove($index)'>Remove</button>
            <button ng-click='tanchu($index)'>Click</button>
        </div>
    </div>
	<script src='http://127.0.0.1:3000/js/demo/index.js'></script>
</body>
</html>
```
-------------------