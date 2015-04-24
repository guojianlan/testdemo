var testmodule = module.exports = function(){
	this.init();
};

var p = testmodule.prototype;

p.init = function(){
	console.log('woca');
}
