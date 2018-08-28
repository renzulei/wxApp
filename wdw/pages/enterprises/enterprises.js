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
    info: [],
    showHide: true,
    viweImage: '', //图片路径
    page: 1, //初始页面
    pageSize: 10, //页面条数
    tradePartyId: '', //id值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var info = JSON.parse(options.data);
    var id = options.id;
    var arr = [];
    info.map((item, i) => {
      if (id == item.addressId) {
        // console.log(item);
        arr.push(item);
        this.setData({
          arr: arr
        })
      }
    })
    this
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    this.getData({page:1,pageSize:10,info:{}});
  },

  // 企业地址
  getData: function ({page, pageSize, info}) {
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
      success: function(res) {
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
        data.map(function(item, i) {
          info.push(JSON.parse(item))
        })

        // 获取到图片的地址
        var certAttachUrl;
        info.map((item, i) => {
          certAttachUrl = item.companyAddrContacts.certAttachUrl;
        })

        that.setData({
          info: info,
        })
        console.log(info);
      },
    })
  },

  // 点击查看功能
  examineTap: function() {
    var certAttachUrl = this.data.certAttachUrl;
    console.log(certAttachUrl);
    var that = this;
    that.setData({
      viewImage: certAttachUrl,
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