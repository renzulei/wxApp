// pages/loging/logion.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    validate: false, //登录名和密码为空检查
    username: '',
    password: '',
    wrong: false, //登录名或密码错误
    // 登录成功后返回的模拟数据
    userDefaultTradeCompany: {
      address: "万荣路700号",
      companyName: "供应链金融测试用户1",
      contactId: 248,
      currencyCode: "CNY",
      customerId: 226,
      employeeEmail: "shengyang.zhou@hand-china.com",
      employeeId: 10001,
      employeeMobil: "13764784777",
      employeeName: "管理员",
      partyName: "供应链金融测试用户1",
      partyNumber: "P0010701",
      regionCode: "HD",
      supplierId: 25,
      tradeCompanyId: 222,
      tradePartyId: 215,
    },
    token: "5050797f-b4ed-416c-a8a6-ad57c3249f7b",
    tokenExpire:3600,
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

  login: function() {
    var that = this;
    var username = this.data.username;
    var password = this.data.password;
    var token = that.data.token;
    var userName = that.data.userName;
    var tokenExpire = that.data.tokenExpire;
    var userDefaultTradeCompany = that.data.userDefaultTradeCompany;
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