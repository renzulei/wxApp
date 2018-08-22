var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');


// pages/site/site.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    info: [], //数据
    page: 1, //页面初始数据
    pageSize: 5, //页面总条数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
  this.getData({page: 1, pageSize: 5, info: {}});
  },

  getData: function ({ page, pageSize, info }) {
    var that = this;
    let tradePartyId = '';
    if (wx.getStorageSync('userDefaultTradeCompany') ? wx.getStorageSync('userDefaultTradeCompany').tradePartyId || "" : "" != null) {
      tradePartyId = wx.getStorageSync('userDefaultTradeCompany') ? wx.getStorageSync('userDefaultTradeCompany').tradePartyId || "" : "";
    }
    wx.request({
      url: `${authService}/certify/queryCompanyAddrCertify?page=${page}&pageSize=${pageSize}&tradePartyId=${tradePartyId}`,
      data: JSON.stringify(info),
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      success: function (res) {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }

        //  获取动态数据
        console.log(res.data);
        var data = res.data.content;
        var info = [];
        data.map(function (item, i) {
          info.push(JSON.parse(item))
        })
        that.setData({
          info: info,
        })
        console.log(info);
      },
    })
  },

  //跳转到查看详情页面
  detailsTap: function(e) {
    var id = e.currentTarget.dataset.index;
  var odd = this.data.info.map((item, i)=>{
      console.log(item)
       odd = item.addressId
       return odd;
    })
    console.log(odd)
    wx.navigateTo({
      url: '/pages/enterprises/enterprises?data=' + JSON.stringify(this.data.info),
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