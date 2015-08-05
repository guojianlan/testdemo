require('../../vendor/zepto.min.js');
var iscroll = window.iscroll = require('../../vendor/iscroll.min.js');
var util = require('../../utils/');
var act = module.exports = function() {
	this.i = 0;
	this.timer = null;
	this.init();
	this.desc = '辣妈寻宝 用嗳呵护';
	new iscroll('#wrapper', {
		scrollX: true,
		scrollY: false,
		mouseWheel: false,
		click: true
	});
};
var p = act.prototype;
p.init = function() {
	var self = this;
	var height = $('.main').height();
	var width = height / 1260 * 6684;
	var clicksize = 0;
	var $clickspan = $('.chashu').find('span').eq(0);
	var $noclickspan = $('.chashu').find('span').eq(1);
	$(".main").css("width", width);
	$('#scroller').css("width", width);
	var arr = [1, 2, 3, 4, 5, 6, 7];
	var sortarr = [];
	var arrimg = ['img/Picture1.png', 'img/Picture1.png', 'img/Picture2.png', 'img/Picture2.png', 'img/Picture3.png'];
	arrimg.sort(function() {
		return 0.5 - Math.random();
	});
	arr.sort(function() {
		return 0.5 - Math.random();
	});
	for (var i = 0; i < 5; i++) {
		sortarr.push(arr.pop());
	};

	for (var i = 0; i < sortarr.length; i++) {
		var imgstr = '.pic0' + sortarr[i];
		$(imgstr).find('img').attr('src', arrimg[i]);
		$(imgstr).show();
	}
	$('.pic').on('touchstart', function(event) {
		event.preventDefault();
		$(this).hide();
		clicksize++;
		$clickspan.html(clicksize);
		$noclickspan.html(5 - clicksize);
		if (clicksize == 5) {
			clearInterval(self.timer);
			self.sendCont();
			var ms = self.i % 60;
			var s = parseInt(self.i / 60 % 60);
			var M = parseInt(self.i / 3600);
			self.desc = '我用了'+M+'分'+s+'秒'+ms+'毫秒完成的嗳呵寻宝，不服来挑战';
			wx.ready(function() {
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
			title: "辣妈寻宝 用嗳呵护",
			desc: self.desc,
			link: 'http://ad.lmbang.com/html/aihe/main.html',
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
		}
	});
	self.autoTime();
	self.bindEvent();
	self.wx();
};
p.bindEvent = function() {
	$('.close').on('click', function(event) {
		event.preventDefault();
		$('.pop').css('display', 'none');
	});
	$('.close1').on('click', function(event) {
		event.preventDefault();
		$('.pop2').css('display', 'none');
	});
	$('.submitbtn').on('click', function(event) {
		event.preventDefault();
		$('.pop').css('display', 'none');
		$('.pop2').css('display', 'block');
	});
	$('.submitbtn1').on('click', function(event) {
		event.preventDefault();
		location.href = 'http://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=325727009&activityId=10ce61b9057d4b3eb3a56acf31cc119b'
	});
	$('.submitbtn2').on('click', function(event) {
		event.preventDefault();
		location.href = './EPPS.html';
	});
	$('.onelink').on('click', function(event) {
		event.preventDefault();
		document.location = "objc://goToOCPage?" + "typeid=" + 1005 + "&typevalue=25";
	});
};
p.autoTime = function() {
	var $timeobj = $('.timesh').find('span');
	var $Minute = $timeobj.eq(0);
	var $Second = $timeobj.eq(1);
	var $Millisecond = $timeobj.eq(2);
	var self = this;
	self.timer = setInterval(function() {
		self.i++;
		var ms = self.i % 60;
		var s = parseInt(self.i / 60 % 60);
		var M = parseInt(self.i / 3600);
		$Minute.html(M < 10 ? (0 + '' + M) : M);
		$Second.html(s < 10 ? (0 + '' + s) : s);
		$Millisecond.html(ms < 10 ? (0 + '' + ms) : ms);
	}, 1000 / 60);
};
p.sendCont = function() {
	var self = this;
	$.ajax({
		url: '/aihegame/submit',
		type: 'POST',
		dataType: 'json',
		data: {
			score: self.i
		},
		success: function(dataresp) {
			if (parseInt(dataresp.ret, 10) === 1) {
				var ms = self.i % 60;
				var s = parseInt(self.i / 60 % 60);
				var M = parseInt(self.i / 3600);
				var $ptime = $('.texttime').find('span');
				var $Mspan = $ptime.eq(0);
				var $Sspan = $ptime.eq(1);
				var $MSspan = $ptime.eq(2);
				var $p2time = $('.texttimeten').find('span');
				var $Mspan2 = $p2time.eq(0);
				var $Sspan2 = $p2time.eq(1);
				var $MSspan2 = $p2time.eq(2);
				$Mspan.html(M);
				$Sspan.html(s);
				$MSspan.html(ms);
				$('.pop').css('display', 'block');
				var rank_link = dataresp.data.rank_list;
				var lastsouce = rank_link[rank_link.length - 1].score;
				if (lastsouce >= self.i) {
					$('.texttimeten').html('您进入前十了,小心给被超越哦！');
				} else {
					var ms = lastsouce % 60;
					var s = parseInt(lastsouce / 60 % 60);
					var M = parseInt(lastsouce / 3600);
					$Mspan2.html(M);
					$Sspan2.html(s);
					$MSspan2.html(ms);
				}
			} else {
				alert(dataresp.msg);
			}
		}
	});

};
p.wx = function() {
	var self  =this;
	var appId = '';
	var timestamp = '';
	var nonceStr = '';
	var signature = '';
	$.get("/wx/getshareconfig/", {
		url: 'http://ad.lmbang.com/html/aihe/index.html'
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
			title: "辣妈寻宝 用嗳呵护",
			desc: self.desc,
			link: 'http://ad.lmbang.com/html/aihe/main.html',
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
new act();