const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkPhone(phone) { //公共手机号合法判断
  var phoneReg = /^((\+?86)|(\(\+86\)))?1[3|4|5|7|8][0-9]\d{8}$|^(09)\d{8}$/;
  if (!phoneReg.test(phone) || phone == '' || (typeof phone == "undefined")) {
    wx.showToast({
      title: '手机号格式不正确或为空',
      image: '/images/error.png', // 提示图标
      duration: 1500
    });
    return false;
  }
  return true;
}

/*查找指定的本地存储是否有值 */
function check_storage(key) {
  var value = wx.getStorageSync(key);
  if (value == "" || value == null) {
    return false;
  } else {
    return true;
  }
}

// sort排序函数
function compare(property) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}

// 深拷贝数组
const deepCopy = (p, c) => {
  var copy = c || [];
  for (var i in p) {
    if (!p.hasOwnProperty(i)) {
      continue;
    }
    if (typeof p[i] === 'object' && p[i] != null) {
      copy[i] = (p[i].constructor === Array) ? [] : {};
      this.deepCopy(p[i], copy[i]);
    } else {
      copy[i] = p[i];
    }
  }
  return copy;
}
// 登录成功存储key
const login = (props) => {
  let {
    token,
    tokenExpire,
    success,
    userName,
    userDefaultTradeCompany
  } = props;
  wx.setStorageSync('__wgt', token);
  wx.setStorageSync('userName', userName);
  wx.setStorageSync('__wgl', 'zh_CN');
  wx.setStorageSync('userDefaultTradeCompany', userDefaultTradeCompany);
  wx.setStorageSync('menuKey', 'index');
  success && success();
}
// 授权的cookie
const authorizedCookie = encodeURI("__wgt=" + wx.getStorageSync('__wgt') + ";" + "__wgl=" + wx.getStorageSync('__wgl') + ";" + "menuKey=" + wx.getStorageSync('menuKey') + ";" + "userName=" + wx.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(wx.getStorageSync('userDefaultTradeCompany')));
// 退出登录清除key
const logout = () => {
  wx.removeStorage({
    key: '__wgt'
  });
  wx.removeStorage({
    key: 'userName'
  });
  wx.removeStorage({
    key: 'userDefaultTradeCompany'
  });
}
/* Email 正则*/
let regEmail = function() {
  return /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/
}
/* Phone 正则*/
let regPhone = function() {
  return /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
}
/* Phone 正则*/
let regPassword = function() {
  return /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/
}
/*金额格式化（三位一个逗号）*/
const formatNum = (str) => {
  if (str != NaN && str != undefined) {
    var newStr = "";
    var count = 0;
    str = str.toString();
    if (str.indexOf(".") == -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      newStr = newStr; //自动补小数点后两位
    } else {
      for (var i = str.indexOf(".") - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      newStr = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
  }
  return newStr
}

module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  check_storage: check_storage,
  compare: compare,
  deepCopy: deepCopy,
  login: login,
  logout: logout,
  regEmail: regEmail,
  regPhone: regPhone,
  regPassword: regPassword,
  formatNum: formatNum,
  authorizedCookie: authorizedCookie
}