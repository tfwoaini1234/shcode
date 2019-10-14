/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
const dateFormat = (obj, fmt) => {
  var o = {
    "M+": obj.getMonth() + 1, //月份
    "d+": obj.getDate(), //日
    "h+": obj.getHours() % 12 == 0 ? 12 : obj.getHours() % 12, //小时
    "H+": obj.getHours(), //小时
    "m+": obj.getMinutes(), //分
    "s+": obj.getSeconds(), //秒
    "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
    "S": obj.getMilliseconds() //毫秒
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[obj.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 格式化人民币
 * @param number 金额
 * @param decimals 保留小数
 * @param dec_point 小数点
 * @param thousands_sep 千分位符号
 * @returns {string}
 */
const amountFormat = (number, decimals, dec_point, thousands_sep) => {// 格式化人民币
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);

}

/**
 * 计算年龄
 * @param strBirthday
 * @returns {string|number}
 */
const getAge = (strBirthday) => {
  if (!strBirthday || strBirthday == '') {
    return '';
  }
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = '';//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge;//返回周岁年龄
}

const crypto = require("crypto");
const generateSecurePathHash = (url) => {
  let secret = 'qingenniao'
  let expires = parseInt((new Date().getTime() / 1000) + '') + 10;
  if (!expires || !url || !secret) {
    return undefined;
  }
  let input = expires + url + " " + secret;
  let binaryHash = crypto.createHash("md5").update(input).digest();
  let base64Value = new Buffer(binaryHash).toString('base64');
  return 'md5=' + base64Value.replace(/=/g, '').replace(/ + /g, '-').replace(/\//g, '_') + '&expires=' + expires;
}

export default {
  dateFormat,
  amountFormat,
  getAge,
  generateSecurePathHash
}
