var testmodule = require('./test/testmodule');
var indexmodule = module.exports = function(){
	(function(){
		indexmodule.init();
	})();
	return indexmodule;
};
indexmodule.init = function(){
	console.log(123123123);
	new testmodule();
};