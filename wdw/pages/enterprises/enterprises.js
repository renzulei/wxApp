// pages/enterprises/enterprises.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
const config = require('../../utils/config.js');
const authorizedCookie = config.authorizedCookie;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },

  // 企业地址认证
  getData: function(e) {
    var that = this;
    wx.request({
      url: `${authService}/certify/queryCompanyAddrCertify?page=1&pageSize=2&tradePartyId=215`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': authorizedCookie
      },
      success: function(res) {
        // try {
        //   util.catchHttpError(res);
        // } catch (e) {
        //   console.error(e)
        //   return
        // 
        var json = res.data;
        var data = that.data.list;
        data = json;
        var arr = JSON.parse(data.content[1]);
        var newArr = [];
        newArr.push(arr);
        // console.log(newArr);

        that.setData({
          newArr: newArr
        })
        console.log(newArr);
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