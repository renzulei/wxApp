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

function checkPhone(phone) {//公共手机号合法判断
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

module.exports = {
  formatTime: formatTime,
  checkPhone: checkPhone,
  check_storage: check_storage
}
