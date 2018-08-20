var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
const util = require('../../utils/util.js');
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    var userName = util.getStorageSync('userName');
    this.setData({
      authorizedCookie: authorizedCookie,
      userName:userName
    })
  },
  // 点击跳转到客户收货管理页面
  AdministratorTap: function(event) {
    wx.navigateTo({
      url: '/pages/Administrator/Administrator',
    })
  },
  takeTap:function(){
    wx.navigateTo({
      url: '/pages/changeAddr/changeAddr',
    })
  },
  // 企业管理的点击事件
  onClick: function(event) {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })
  },

  // 跳转到用户页面
  userTap: function(event) {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },

  // 跳转到我的关注页面
  concernTap: function(event) {
    wx.navigateTo({
      url: '/pages/concern/concern',
    })
  },

  // 跳转到企业认证页面
  enterpriseTap: function(event) {
    wx.navigateTo({
      url: '/pages/enterprise/enterprise',
    })
  },
  // 跳转到企业地址认证页面
  enterprisesTap: function(event) {
    wx.navigateTo({
      url: '/pages/site/site',
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