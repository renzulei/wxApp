// pages/loging/logion.js
const util = require('../../utils/util.js');
var app = getApp()
var umService = app.globalData.umService
Page({

  /**
   * 页面的初始数据
   */
  data: {
    validate: false, //登录名和密码为空检查
    username: '',
    password: '',
    wrong: false, //登录名或密码错误
    error_msg: "您输入的用户名或密码错误....."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var username = wx.getStorageSync('login-username') || '';
    var password = wx.getStorageSync('login-password') || '';

    this.setData({
      username: username,
      password: password
    }, this.checkValidate);
    if (username != '' && password != '') {
      // this.login();
    }
  },
  login: function () {
    var that = this;
    var username = this.data.username;
    var password = this.data.password;
    wx.request({
      url: `${umService}/user/userLogin`,
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'cookie': util.noLoginCookie
      },
      data: JSON.stringify(this.getSubmitBody(username, password)),
      success: function (res) {
        console.log(res.data)
        var json = res.data;
        if (json.code == "S") {
          let {
            tokenExpire,
            token,
            userName,
            userDefaultTradeCompany
          } = json;
          util.login({
            token,
            userName,
            tokenExpire,
            userDefaultTradeCompany,
            success: () => {
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
          that.setData({
            wrong: false
          });
        } else if (json.code == "E") {
          that.setData({
            error_msg: json.msg,
            wrong: true
          });
        }
      }
    })


  },
  setName: function(e) {
    var username = e.detail.value;
    this.setData({
      username
    }, this.checkValidate);
    wx.setStorageSync('login-username', username)

  },

  setPass: function(e) {
    var password = e.detail.value;
    this.setData({
      password
    }, this.checkValidate);
    wx.setStorageSync('login-password', password)

  },

  checkValidate: function() {
    var bull = false;
    if (this.data.username != '' && this.data.password != '') {
      bull = true;
    }
    this.setData({
      validate: bull
    })
  },
  /**userName Password取值提交**/
  getSubmitBody: function(v1, v2) {
    let regP = util.regPhone(),
      regE = util.regEmail()
    return regP.test(v1) ? {
        'phone': v1,
        'password': v2,
      } :
      regE.test(v1) ? {
        'email': v1,
        'password': v2,
      } : {
        'userName': v1,
        'password': v2,
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})