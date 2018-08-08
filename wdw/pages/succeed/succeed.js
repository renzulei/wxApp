// pages/succeed/succeed.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var saleOrderShow = JSON.parse(options.saleOrderShow);
    // console.log(saleOrderShow)
    this.setData({
      saleOrderShow: saleOrderShow
    })
  },

  // 点击跳转到产品列表页面
  succeedTap: function() {
    wx.switchTab({
      url: '/pages/proList/proList',
    })
  },

  particularsTap: function() {
    wx.navigateTo({
      url: '/pages/manage/manage',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})