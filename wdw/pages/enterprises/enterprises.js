// pages/enterprises/enterprises.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据 
   */
  data: {
    showHide: true
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

  // 企业地址认证
  getData: function(e) {
    var that = this;
    wx.request({
      url: `${authService}/certify/queryCompanyAddrCertify?page=1&pageSize=2&tradePartyId=215`,
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
        //  获取动态数据
        // var data = that.data.list;
        // data = res.data;
        // var arr = JSON.parse(data.content[1]);
        // var newArr = [];
        // newArr.push(arr);
        // that.setData({
        //   newArr: newArr
        // })
        // console.log(newArr);

        //  获取动态数据
        console.log(res.data);
        var data = [];
        data = res.data.content;
        // console.log(data);
        var arr = [];
        data.map(function(item, i) {
          arr.push(JSON.parse(item))
        })
        console.log(arr);
        var newArr = [];
        newArr = arr.slice(0,1)
        console.log(newArr);
        that.setData({
          data: newArr
        })
      },
    })
  },

  // 点击查看功能
  examineTap: function() {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })
  },

  // 点击取消蒙层功能
  cancelTap: function() {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
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