var _ = require('lodash');
var $ =require('jquery');
var lodashtemplate = require('html!./lodashdemo.html');
var lodashModule = module.exports = function(){
	this.init();
};

var p = lodashModule.prototype;

p.init=function(){
	console.log('goto render');
	this.render();
};

p.render = function(){
	if(_.isFunction(this.beforeRender)) this.beforeRender();
	if(_.isFunction(this.afterRender)) this.afterRender();
};

p.beforeRender=function(){
	console.log('goto templateRender');
	this.templateRender();
};
p.templateRender = function(){
	var compiled = _.template(lodashtemplate);
	$('div').append(compiled({
		test:111
	}));
}

p.afterRender=function(){
	console.log('render end');
};