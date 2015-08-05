require('../../vendor/zepto.min.js');
var util = require('../../utils/');
var act = module.exports = function() {
	this.init();

	this.flag = true;
};
p = act.prototype;
p.init = function() {
	var self = this;
	$(document).ready(function() {
		$.ajax({
			url: '/active-lotterybaidutwo/isWin',
			type: 'POST',
			dataType: 'json',
			data: {},
			success: function(respdata) {
				var ret = parseInt(respdata.ret, 10);
				if (ret === 2) {
					$('.shade').css('display', 'block');
					$('.awardBox').css('display', 'block');
					$('.cxtitle').find('img').attr('src', './img/lunPan01.png?rf=1');
					switch (parseInt(respdata.data.num, 10)) {
						case 0:
							$('#jiangpin').attr('src', './img/award0' + 1 + '.png?rf=1');
							break;
						case 2:
							$('#jiangpin').attr('src', './img/award0' + 2 + '.png?rf=1');
					}

				}
			}
		});

		var deg = [];
		var timer = 3000;
		var defaultreg = 1080;
		$('.inputBtn').on('click', function(event) {
			var str='';
			event.stopPropagation();
			var $username = $.trim($('#username').val());
			var $phonenum = $.trim($('#phonenum').val());
			var $address = $.trim($('#address').val());
			if (!util.isMobile($phonenum)) {
				str+='请输入正确的手机号码';
			}
			if($username===''){
				str+= (str===''?('请填写姓名'):('\n请填写姓名'));
			}
			if($address===''){
				str+= (str===''?('请填写地址'):('\n请填写地址'));
			}
			if(str===''){
				
				self.postMessage($username,$phonenum,$address);
			}else{
				alert(str);
			}
		});
		for (var i = 0; i < 4; i++) {
			var rotatedeg = (defaultreg + (i * 90)) + 'deg';
			deg.push(rotatedeg);
		}
		//0是一等奖，2是二等奖，1，3不中奖
		$('.zhizhen').one('click', function() {
			$.ajax({
				url: '/active-lotterybaidutwo/activity',
				type: 'POST',
				dataType: 'json',
				data: {},
				success: function(datajson) {
					switch (parseInt(datajson.ret, 10)) {
						case 0:
							alert('请登录后重试');
							location.href = 'http://m.lmbang.com/user/login?return_uri=http://ad.lmbang.com/html/0512zp/activity.html';
							break;
						case 2:
							$('.zhuanpan').animate({
								'rotate': deg[datajson.data.num]
							}, timer, function() {
								switch (parseInt(datajson.data.num, 10)) {
									case 0:
										setTimeout(function() {
											$('.shade').css('display', 'block');
											$('.awardBox').css('display', 'block');
											$('.cxtitle').find('img').attr('src', './img/lunPan01.png?fr=1');
											$('#jiangpin').attr('src', './img/award0' + 1 + '.png?rf=1');
										}, 1000);
										break;
									case 2:
										setTimeout(function() {
											$('.shade').css('display', 'block');
											$('.awardBox').css('display', 'block');
											$('.cxtitle').find('img').attr('src', './img/lunPan01.png?rf=1');
											$('#jiangpin').attr('src', './img/award0' + 2 + '.png?rf=1');
										}, 1000);
										break;
									default:
										setTimeout(function() {
											$('.shade').css('display', 'block');
											$('.awardBox').css('display', 'block');
											$('.cxtitle').hide();
											$('.cont').css('background-image', 'url(./img/lunPan03.png)').find('img').hide();
											$('.foot').hide();
										}, 1000);
								}
							});
							break;
						default:
							alert(datajson.msg);
					}
				}
			});

		});
	});
};
p.postMessage = function(username,phone,address) {
	$.ajax({
		url: '/active-lotterybaidutwo/saveuserinfo',
		type: 'POST',
		dataType: 'json',
		data: {
			username: username,
			phone:phone,
			address:address
		},
		success: function(datajson) {
			if (parseInt(datajson.ret, 10) === 2) {
				$('.foot').hide();
			}
			alert(datajson.msg);
		}

	});
};
new act();
