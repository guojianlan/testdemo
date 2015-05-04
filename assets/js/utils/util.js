var util = require('util');

var tool = module.exports = function() {
  this.version = '0.1.1';
};

var p = tool.prototype;

/**
 * @description check params if is Array
 * @param {Array} arr is Array
 * @return {Bool}
 */
p.isArray = function(arr) {
  return Array.isArray(arr);
};

/**
 * @description check params is Object
 * @param {Object} obj check param
 * @return {Bool}
 */
p.isObject = function(obj) {
  // check is Object has toString Method
  // if exist, use ES5 method to check
  // if not, use common method
  if (Object.toString) {
    return obj.toString() === '[object Object]';
  } else {
    return typeof obj === 'object' && obj !== null;
  }
};

/**
 * @description check param is Function
 * @param {Function} fn check params
 * @return {Bool}
 */
p.isFunction = function(fn) {
  return typeof fn === 'function';
};

/**
 * @description check param is Chinese
 * @param {String} str check param
 * @return {Bool}
 */
p.isChinese = function(str) {
  return (/^[\u4e00-\u8fa5]+$/).test(str);
};

/**
 * @description check param is Email
 * @param {String} str check param
 * @return {Bool}
 */
p.isEmail = function(string) {
  return (/^([\-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/).test(string);
};

/**
 * @description class extend
 * @param {Class} extend class and parent class
 */
p.extend = function(childClass, parentClass) {
  if (!this.isFunction(childClass) || !this.isFunction(parentClass)) throw new Error('params is not function');
  childClass._supper = new parentClass();
  childClass.prototype = parentClass.prototype;
  parentClass.constructor = parentClass;
};


/**
 * @description UUID create the uuid
 */
p.uuid = function() {
  var ret = "";
  for (var i = 1; i <= 8; ++i) {
    ret += Math.floor(Math.random() * 16.0).toString(16);
    if (i === 4) {
      ret += '_';
    }
  }
  return ret;
};


// 接受时间戳和指定格式如'Y年M月D日',作为参数的时间转换函数,
p.timeToFormat = function(timeStamp, fmt) {
  var date, year, month, day;

  timeStamp *= 1000;

  date = new Date(timeStamp);
  var M = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  var h = date.getHours() >= 10 ? date.getHours() : '0' + (date.getHours());
  var D = date.getDate() >= 10 ? date.getDate() : '0' + (date.getDate());
  var m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + (date.getMinutes());
  var s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + (date.getSeconds());
  var z = {
    Y: date.getFullYear(),
    M: M,
    D: D,
    h: h,
    m: m,
    s: s
  };
  return fmt.replace(/(Y+|M+|D+|h+|m+|s+)/g, function(v) {
    return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1)));
  });
};

// 字符串格式化函数
// 可使用handlebars模板替代此公用函数
p.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
};

p.lastIndex = function(str, tag) {
  if (str) {
    return str.lastIndexOf(tag);
  }
};

/**
 * @description 身份证验证
 */
p.isIDCard = function(str) {
  //身份证正则表达式(15位)
  var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

  //身份证正则表达式(18位)
  var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;

  //验证身份证
  return (isIDCard1.test(str) || isIDCard2.test(str));
};

/**
 * @description 手机号验证
 */
p.isMobile = function(str) {
  var reg = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57])[0-9]{8}$/g;
  return reg.test(str);
};

// 获取unicode字符串的长度
p.getUnicodeLen = function(str) {
  var reg = /^[\u4e00-\u9fa5],{0,}$/i,
    total = 0;

  for (var i = 0, len = str.length; i < len; i++) {
    if (reg.test(str.charAt(i))) {
      total += 2;
    } else {
      total += 1;
    }
  }
  return total;
};

/**
 * @description slice of string example: ellipse('aaaaaaa', '3', '..') => aaa...
 */
p.ellipse = function(str, maxLen, tag) {
  return (str.length > parseInt(maxLen, 10) ? str.substring(0, parseInt(maxLen, 10)) + tag.toString() : str);
};

/**
 * @description 获取cookie中name对应的值
 */
p.getCookie = function(name) {
  var cookies = document.cookie.split("; "),
    arr;
  for (var i = 0, len = cookies.length; i < len; i++) {
    arr = cookies[i].split("=");
    if (arr[0] == name) {
      return decodeURI(arr[1]);
    }
  }
  return "";
};

/**
 * 设置cookie
 * option[name] cookie名，必选
 * option.value: cookie值，必选
 * option.expiresHours: 过期时间，可选，默认为浏览器关闭即消失
 * option.path: cookie存放路径，可选。例如"/"、"/shop"。
 * 默认情况下,如果在某个页面创建了一个cookie,那么该页面所在目录中的其他页面也可以访问该cookie
 * 如果这个目录下还有子目录，则在子目录中也可以访问。
 * 例如在www.xxxx.com/html/a.html中所创建的cookie，
 * 可以被www.xxxx.com/html/b.html或www.xxx.com/html/some/c.html所访问，但不能被www.xxxx.com/d.html访问。
 * option.domain: 可访问该cookie的域名，可选。
 */
p.setCookie = function(option) {
  var cookieStr = option.name + "=" + option.value;
  if (option.expiresHours) {
    var date = new Date();
    date.setTime(date.getTime() + option.expiresHours * 3600 * 1000);
    cookieStr = cookieStr + "; expires=" + date.toUTCString();
  }
  if (option.path) {
    cookieStr = cookieStr + "; path=" + option.path;
  }
  if (option.domain) {
    cookieStr = cookieStr + "; domain=" + option.domain;
  }
  document.cookie = cookieStr;
};

/**
 * 删除cookie
 * name: cookie名，必选
 * option.path: cookie存放路径，可选
 * option.domain: 可访问该cookie的域名，可选
 * 需要注意的是，设置cookie时，如果setCookie传了path、domain，删除时也必选传入这两个参数
 * 否则无法删除cookie
 * 另外，经测试，如设置了path、domain，删除时需在设置cookie的同一域下删除
 */
p.deleteCookie = function(name, option) {
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  document.cookie = name +
    "=88; expires=" +
    date.toUTCString() +
    (option.path ? ("; path=" + option.path) : "") +
    (option.domain ? ("; domain=" + option.domain) : "");
};

/**
 * @description 获取url参数值
 * @params {String} 获取值的参数名称
 * @return {String | Null}
 *
 */
p.getQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]);
  return null;
};

/**
 * @description 检测apple设备
 *
 */
p.isAppleDevice = function() {
  return (
    (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
    (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
    (navigator.userAgent.toLowerCase().indexOf("ipod") > -1));
};

/**
 * @description 宿主环境配置
 */
p.browser = function() {
  var u = navigator.userAgent;
  return {
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
  };
};

/**
 * @description 截取指定长度字符并返回
 *
 */
p.subString = function(str, len) {
  var l = 0;
  var s = "";
  var a = str.split("");
  for (var i = 0; i < a.length; i++) {
    if (a[i].charCodeAt(0) < 299) {
      l++;
    } else {
      l += 2;
    }
    if (l > len) {
      return s;
    }
    s += a[i];
  }
  return s;
};
