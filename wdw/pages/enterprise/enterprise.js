var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');

// pages/enterprise/enterprise.js
Page({

  /**  
   * 页面的初始数据
   */
  data: {
    list: [],
    showHide: true,
    viewImage: '', //图片路径
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

  // 企业认证
  getData: function() {
    var that = this;
    wx.request({
      url: `${authService}/certify/getCompanyCertify?tradeCompanyId=${wx.getStorageSync('userDefaultTradeCompany') ? wx.getStorageSync('userDefaultTradeCompany').tradeCompanyId||'':''}`,
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
        // 获取动态数据
        var data = that.data.list;
        data = res.data;
        var arr = JSON.parse(data.content);
        var newArr = [];
        newArr.push(arr);
        that.setData({
          newArr: newArr,
        })
        console.log(newArr);
      }
    })
  },

  // 点击查看-弹出蒙层
  //账号备案
  enchashmentAcctRecord: function(e) {
    var that = this;
    console.log(e);
    var enchashmentAcctRecord = e.currentTarget.dataset.index;
    console.log(enchashmentAcctRecord);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${enchashmentAcctRecord}`, //图片路径
      showHide: (!that.data.showHide)
    })
    // this.handleViewImageImg(enchashmentAcctRecord);
  },
  //营业执照
  busLicenceAttchId: function(e) {
    var that = this;
    console.log(e);
    var busLicenceAttchId = e.currentTarget.dataset.index;
    console.log(busLicenceAttchId);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${busLicenceAttchId}`, //图片路径
      showHide: (!that.data.showHide)
    })
  },
  //开户许可证
  accountAttchId: function(e) {
    var that = this;
    console.log(e);
    var accountAttchId = e.currentTarget.dataset.index;
    console.log(accountAttchId);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${accountAttchId}`, //图片路径
      showHide: (!that.data.showHide)
    })
  },

  //税务登记证
  taxAttchId: function(e) {
    var that = this;
    console.log(e);
    var taxAttchId = e.currentTarget.dataset.index;
    console.log(taxAttchId);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${taxAttchId}`, //图片路径
      showHide: (!that.data.showHide)
    })
  },

  //组织机构代码
  organizationAttchId: function(e) {
    var that = this;
    console.log(e);
    var organizationAttchId = e.currentTarget.dataset.index;
    console.log(organizationAttchId);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${organizationAttchId}`, //图片路径
      showHide: (!that.data.showHide)
    })
  },

  //开票资料
  billingAttchId: function(e) {
    var that = this;
    console.log(e);
    var billingAttchId = e.currentTarget.dataset.index;
    console.log(billingAttchId);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${billingAttchId}`, //图片路径
      showHide: (!that.data.showHide)
    })
  },

  //企业认证授权书
  orgAuthAttchId: function(e) {
    var that = this;
    console.log(e);
    var orgAuthAttchId = e.currentTarget.dataset.index;
    console.log(orgAuthAttchId);
    that.setData({
      viewImage: `${authService}/ossObject/download?objectId=${orgAuthAttchId}`, //图片路径
      showHide: (!that.data.showHide)
    })
  },
  // 点击蒙层-取消蒙层
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