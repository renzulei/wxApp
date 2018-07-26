var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var cmService = app.globalData.cmService;
var customer_id = app.globalData.customer_id
const util = require('../../utils/util.js')

// pages/home/user/user.js
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
    this.getData();
  },
  getData: function () {
    wx.request({
      url: `${cmService}/core/restapi/private/user/getUserInfo`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': '__wgl=' + wx.getStorageSync('__wgl')
      },
      success: function (res) {
        console.log(res.data);
      },
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