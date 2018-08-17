// pages/changeAddr/changeAddr.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partyIndex: -1, //业务主体数组索引
    addrIndex: -1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  // 初始化
  init: function () {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    var userDefaultTradeCompany = util.getStorageSync('userDefaultTradeCompany');
    var partyName = userDefaultTradeCompany ? userDefaultTradeCompany.partyName : "";
    var address = userDefaultTradeCompany ? userDefaultTradeCompany.address : "";
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId : "";
    var contactId = userDefaultTradeCompany ? userDefaultTradeCompany.contactId : "";
    this.setData({
      partyName: partyName,
      address: address,
      tradePartyId: tradePartyId,
      contactId: contactId
    })
    this.getData(authorizedCookie);
  },
  getData: function (authorizedCookie){
    wx.request({
      url: `${authService}/user/getAllUserContact`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': authorizedCookie
      },
      success: (res) => {
        console.log(res.data)
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        if (json.code == 'S') {
          this.setData({
            dataS: json.userContacts.tradePartys || [],
            companyName: json.userContacts.companyName
          })
        }
      }
    })
  },
  // 业务主体改变
  partyChange: function (e) {
    var index = e.detail.value;
    this.data.dataS.map((item, i) => {
      if (index == i) {
        this.setData({
          canSubmit: true,
          partyName: item.partyName,
          partyNumber: item.partyNumber,
          tradeCompanyId: item.tradeCompanyId,
          tradePartyId: item.tradePartyId,
          currencyCode: item.customer ? item.customer.currencyCode : "",
          customerId: item.customer ? item.customer.customerId : "",
          supplierId: item.supplier ? item.supplier.supplierId : "",
          employeeEmail: item.exclusiveDealer ? item.exclusiveDealer.email : "",
          employeeId: item.exclusiveDealer ? item.exclusiveDealer.employeeId : "",
          employeeMobil: item.exclusiveDealer ? item.exclusiveDealer.mobil : "",
          employeeName: item.exclusiveDealer ? item.exclusiveDealer.name : "",
          contacts: item.contacts,
        })
      }
    })
    this.setData({
      partyIndex: index,
    })
  },
  // 收货地址改变
  addrChange: function (e) {
    var index = e.detail.value;
    this.data.contacts.map((item, i) => {
      if (index == i) {
        this.setData({
          canSubmitT: true,
          contactId: item.contactId,
          regionCode: item.regionCode,
          address: item.address,
        })
      }
    });
    this.setData({
      addrIndex: index,
    })
  },
  handleOk: function () {
    if (!(this.data.canSubmitT && this.data.canSubmit && this.data.contacts.length)) return;
    var userDefaultTradeCompany = {
      address: this.data.address,
      companyName: this.data.companyName,
      contactId: this.data.contactId,
      currencyCode: this.data.currencyCode,
      customerId: this.data.customerId,
      employeeEmail: this.data.employeeEmail,
      employeeId: this.data.employeeId,
      employeeMobil: this.data.employeeMobil,
      employeeName: this.data.employeeName,
      partyName: this.data.partyName,
      partyNumber: this.data.partyNumber,
      regionCode: this.data.regionCode,
      supplierId: this.data.supplierId,
      tradeCompanyId: this.data.tradeCompanyId,
      tradePartyId: this.data.tradePartyId
    }
    console.log(userDefaultTradeCompany)
    util.setStorageSync('userDefaultTradeCompany', userDefaultTradeCompany, 3600);
    wx.showModal({
      title: '温馨提示',
      content: '修改成功',
      confirmText: '返回',
      success: function (re) {
        if (re.confirm) {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }
      }
    })
  },
  goback:function(){
    wx.navigateBack({
      delta:1
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