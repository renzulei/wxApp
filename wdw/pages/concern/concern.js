var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
// pages/concern/concern.js
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    box: true,
    pageSize: 10,//页面数据条数
    current: 1,//起始页
    array: ['请选择商品大类', '高级瓦楞纸', '进口瓦楞纸', '普通瓦楞纸'],
    index: 0,
    show: true,
    shouHide: true,
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    this.getData();
  },

     // 获取动态数据 
  getData: function (e) {
    var that = this;
    var current = this.data.current;
    var pageSize = this.data.pageSize;
    wx.request({
      url: `${authService}/resourceBill/queryMyFollowResBill?page=${ current }&pageSize=${ pageSize }`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      success: function(res) {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
   
        console.log(res.data);
        var data = [];
        data = res.data.content;  
        data = data.map(function(item, i) {
          return JSON.parse(item);
        })
        console.log(data);
        that.setData({
          data: data,
        })
      }
    })
  },

// 商品大类点击事件
  bindPickerChange: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },

  // 点击选中取消按钮
  iconTap: function(e) {
    console.log(e);
    var that = this;
    that.setData({
      show: (!that.data.show)
    })
  },

//取消关注点击事件
  footerTap: function(e) {
    console.log(e);
    var that = this;
    that.setData({
      showHide: (!that.data.showHide),
      show: false
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
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