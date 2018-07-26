var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
const authorizedCookie = config.authorizedCookie;

// pages/home/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },

  getData: function(e) {
    var that = this;
    wx.request({
      url: `${authService}/user/getUserInfo`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': authorizedCookie
      },
      success: function(res) {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        var info = that.data.info;
        info = json;
        that.setData({
        info:json
        })
        console.log(info)
        var arr = JSON.parse(info);
        console.log(arr);
      },
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