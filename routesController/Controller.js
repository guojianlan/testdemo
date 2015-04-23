var Path = require('path');
var fs = require('fs');
var Boom = require('boom');
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
	var isExit = fs.existsSync(absPath);
	if(isExit){
		if(jsPath.match(/vendor/g)){
			return rep.file(absPath);
		}
	}else{
		return rep(Boom.notFound('missing'));
	}
};