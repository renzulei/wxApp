var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
const authorizedCookie = config.authorizedCookie;
// pages/concern/concern.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    box: true,
    list: [{
        id: "0",
        title: "江苏富星A级单面涂布灰底白板纸灰底涂布纸350g 平张",
        ping_zhang: "平张",
        yin_shua: "印刷纸",
        tu_bu: "灰底涂布纸",
        jia_ge: "￥8670.69"
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },

  // 跳转到产品列表页面
  proListTap: function(event) {
    wx.switchTab({
      url: '/pages/proList/proList',
    })
  },
  // getData: function (e) {
  //   var that = this;
  //   wx.request({
  //     url: `${authService}/resourceBill/queryMyFollowResBill?page=1&pageSize=10`,
  //     data: {},
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json',
  //       'cookie': authorizedCookie
  //     },
  //     success: function (res) {
  //       // try {
  //       //   util.catchHttpError(res);
  //       // } catch (e) {
  //       //   console.error(e)
  //       //   return
  //       // 
  //      var data = that.data.data;
  //      data = res.data;
  //      that.setData({
  //        data:data
  //      })
  //      console.log(data)
  //     },
  //   })
  // },

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