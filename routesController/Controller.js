var Path = require('path');
var fs = require('fs');
var Boom = require('boom');
module.exports.htmlFile=function(req,rep){
	var htmlPath = req.params.htmlPath;
	var absPath = Path.join(__dirname,'../views/'+htmlPath);
	var isExit = fs.existsSync(absPath);
	return isExit ? rep.view(htmlPath) : rep(Boom.notFound('missing'));
}