var Path = require('path');
var fs = require('fs');
var Boom = require('boom');
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var jsxLoader = require('jsx-loader');
module.exports.htmlFile = function(req, rep) {
	var htmlPath = req.params.htmlPath;
	var absPath = Path.join(__dirname, '../views/' + htmlPath);
	var isExit = fs.existsSync(absPath);
	return isExit ? rep.view(htmlPath) : rep(Boom.notFound('missing'));
};
module.exports.cssFile = function(req, rep) {
	var cssPath = req.params.cssPath;
	var absPath = Path.join(__dirname, '../assets/css/' + cssPath);
	var isExit = fs.existsSync(absPath);
	if (isExit) {
		var ReadStream = fs.createReadStream(absPath);
		return rep(ReadStream).type('text/css; charset=utf-8');
	} else {
		return rep(Boom.notFound('missing'))
	}
};
module.exports.imgFile = function(req, rep) {
	var imgPath = req.params.imgPath;
	var absPath = Path.join(__dirname, '../assets/img/' + imgPath);
	var isExit = fs.existsSync(absPath);
	return isExit ? rep.file(absPath) : rep(Boom.notFound('missing'));
};
module.exports.jsFile = function(req, rep) {
	var jsPath = req.params.jsPath;
	var absPath = Path.join(__dirname, '../assets/js/' + jsPath);
	var desPath = Path.join(__dirname, '../assets/js/' + jsPath.replace(/\.js/g, '.dev.js'));
	var isExit = fs.existsSync(absPath);
	if (isExit) {
		if (jsPath.match(/vendor/g)) {
			return rep.file(absPath);
		}
		//删除.dev.js文件
		gulp.src(desPath).pipe(rimraf());
		var gulpStream = gulp.src(absPath)
			.pipe(webpack({
				module: {
					loaders: [{
						test: /\.jsx$/,
						loader: 'jsx-loader?insertPragma=React.DOM&harmony'
					}]
				},
				debug: true,
				devtool: '#eval',
				resolve: {
					extensions: ['', '.js', '.jsx']
				}
			}))
			.pipe(rename(Path.basename(desPath)))
			.once('data', function(file) {
				rep(file.contents).type('application/javascript');
			});
	} else {
		return rep(Boom.notFound('missing'));
	}
};