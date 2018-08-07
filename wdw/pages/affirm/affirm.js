// pages/affirm/affirm.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var prevData = JSON.parse(options.prevData) 
    console.log(prevData)
    this.setData({
      prevData: prevData,
    })
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    var userDefaultTradeCompany = util.getStorageSync('userDefaultTradeCompany');
    var partyName = userDefaultTradeCompany ? userDefaultTradeCompany.partyName : "";
    var address = userDefaultTradeCompany ? userDefaultTradeCompany.address : "";
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId : "";
    var currencyCode = userDefaultTradeCompany ? userDefaultTradeCompany.currencyCode : "";
    this.setData({
      partyName: partyName,
      address: address,
      tradePartyId: tradePartyId,
      currencyCode: currencyCode,
    })
    if(!util.getStorageSync("userName")){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },
  // 点击显示和隐藏内容区域
  doFold: function (e) {
    var index = e.currentTarget.dataset.index;
    this.data.prevData.folders.map(function (it, i) {
      i == index ? it.fold = !it.fold : ""
    })
    this.setData({
      prevData: this.data.prevData
    })
  },
// 立即下单
  placeTap: function() {
    if (util.getStorageSync("userName")){
      wx.request({
        url: `${authService}/saleOrder/submitSaleOrder`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'cookie': this.data.authorizedCookie
        },
        data: JSON.stringify({
          custTradePartyId: this.data.tradePartyId
        }),
        success: (res) => {
          console.log(res)
          try {
            util.catchHttpError(res);
          } catch (e) {
            console.error(e)
            return
          }
          var json = res.data;
          if (json.code == "S") {
            wx.navigateTo({
              url: `/pages/succeed/succeed?saleOrderShow=${JSON.stringify(json.saleOrderShow)}`,
            })
          } else {
            wx.showToast({
              title: json.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }else{
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    
  },
  // 回到上个页面
  goBack:function(){
    wx.navigateBack({
      delta: 1
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