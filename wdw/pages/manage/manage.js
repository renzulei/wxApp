// pages/manage/manage.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    array: ['请选择支付方式', '现金支付', '微信支付', '支付宝支付', '银行卡支付'], //付款方式
    index: 0,
    // 订单内容
    items: [
      {
      ding_dan: "YCD0018652",
      jin_e: "￥6178430.0",
      zhuang_tai: "待发货",
      xiadan_shijian: "2018-01-26 15:36:21"
    },
      {
        ding_dan: "YCD0018652",
        jin_e: "￥6178430.0",
        zhuang_tai: "待发货",
        xiadan_shijian: "2018-01-26 15:36:21"
      },
      {
        ding_dan: "YCD0018652",
        jin_e: "￥6178430.0",
        zhuang_tai: "待发货",
        xiadan_shijian: "2018-01-26 15:36:21"
      },
  ],

    nav: [
      {
        all: "所有订单",
        submit: "已提交",
        close:"已关闭",
        cancel: "已取消",
        abnormal: "异常",
        audit: "已审核"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  bindPickerChange: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },
//订单详情
  particularsTap: function(e) {
    wx.navigateTo({
      url: '/pages/particulars/particulars',
    })
  },

// nav点击事件
 navTap: function(e) {
   console.log(e)
   var num = this.data.num;
    this.setData({
      num:e.target.dataset.num
    })
 },

 //已提交页面
 submitTap: function(e) {
    wx.navigateTo({
      url: '/pages/submit/submit',
    })
 },
//已关闭页面
 closeTap: function(e) {
    wx.navigateTo({
      url: "/pages/close/close",
    })
 },
//已取消页面
 cancelTap: function (e) {
   wx.navigateTo({
     url: "/pages/cancel/cancel",
   })
 },
// 异常页面
abnormalTap: function (e) {
   wx.navigateTo({
     url: "/pages/abnormal/abnormal",
   })
 },
// 已审核页面
 auditTap: function (e) {
   wx.navigateTo({
     url: "/pages/audit/audit",
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