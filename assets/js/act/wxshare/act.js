require('../../vendor/zepto.min.js');
var wx = window.wx= require('../../vendor/wx.min.js');
var wxshare = module.exports = function(){
	this.init();
}

var p = wxshare.prototype;

p.init=function(){
	var appId = '';
	var timestamp = '';
	var nonceStr = '';
	var signature = '';
	$.get("/wx/getshareconfig/", {
		url: 'http://ad.lmbang.com/html/weixinshare/index.html'
	}, function(json) {
		if (json.ret == "1") {
			appId = json.data.appId;
			timestamp = json.data.timestamp;
			nonceStr = json.data.noncestr;
			signature = json.data.signature;
		}
		//  alert(signature);
		wx.config({
			//debug: true,
			appId: appId,
			timestamp: timestamp,
			nonceStr: nonceStr,
			signature: signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'translateVoice',
				'startRecord',
				'stopRecord',
				'onRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard'
			]
		});
	}, 'json');

	wx.ready(function() {
		alert(wx);
		// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
		var fullimg = "http://s07.lmbang.com/M00/BB/AF/DpgiA1VCBXSAULYfAAAklMnPjX4703.jpg";
		wx.checkJsApi({
			jsApiList: [
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			],
			success: function(res) {
				//     alert(JSON.stringify(res));
			}
		});

		var shareData = {
			title: "微信分享测试",
			desc: "描述",
			link: 'http://ad.lmbang.com/html/weixinshare/index.html',
			imgUrl: fullimg
		};
		
		wx.onMenuShareAppMessage(shareData);
		wx.onMenuShareTimeline(shareData);
		wx.onMenuShareQQ(shareData);
		wx.onMenuShareWeibo(shareData);

	});
	wx.error(function(res) {
		//alert(res.errMsg);
	});
};
new wxshare();