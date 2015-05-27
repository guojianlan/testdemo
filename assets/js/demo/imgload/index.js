var imgPath = 'images/';
var loadImage = function(path,callback){
	var img = new Image();
	img.onload = function(){
		img.onload=null;
		callback(path);
	}
	img.src= path;
}
var loadingPage = (function(){
	var sourceArr = ['xx.jpg'];
	for (var i = 0; i < sourceArr.length; i++) {
		sourceArr[i] = (imgPath+sourceArr[i])''
	};
	var imgLoader = function(imgs,callback){
		var len = imgs.length;
		var i=0;
		while(len){
			loadImage(imgs.shift(),function(path){
				callback(path,++i,len);
			});
		}
	}
	imgLoader(sourceArr,function(path,curNum,total){
		var percent = curNum/total;
		if(percent === 1){
			alert('加载完毕');
		}
	});

})();

