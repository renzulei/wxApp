// pages/particulars/particulars.js
const app = getApp();
const util = require('../../utils/util.js');
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var umService = app.globalData.umService;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pageSize:10,
    dataSource:null,//总数据源
    tableSource:[],//列表数据源
    is_loading_done:false,//是否全部加载完成
    loading:false,//是否正在加载
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    var userDefaultTradeCompany = util.getStorageSync('userDefaultTradeCompany');
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId : "";
    var contactId = userDefaultTradeCompany ? userDefaultTradeCompany.contactId : "";
    this.setData({
      tradePartyId: tradePartyId,
      contactId: contactId
    })
    var orderHeaderId = options.orderHeaderId;
    // console.log(orderHeaderId)
    this.setData({
      orderHeaderId: orderHeaderId
    })
    if (!util.getStorageSync("userName")) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    this.handleFetch({
      page:1,
      pageSize:10,
      orderHeaderId: orderHeaderId,
      custTradePartyId: tradePartyId,
      authorizedCookie: authorizedCookie
    })
  },
  handleFetch: function ({ page, pageSize, orderHeaderId, custTradePartyId, authorizedCookie}){
    this.setData({
      loading: true
    })
    wx.request({
      url: `${authService}/saleOrderShow/getSaleOrderDetail?page=${page}&pageSize=${pageSize}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': authorizedCookie
      },
      data: JSON.stringify({
        orderHeaderId: orderHeaderId,
        custTradePartyId: custTradePartyId,
      }),
      success: (res) => {
        // console.log(page, res.data)
        this.setData({
          loading: false
        })
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        if (json.code == "S") {
          var tableSource = this.data.tableSource || [];
          if (json.saleOrderDetail.saleOrderLine.length < 10) {
            this.setData({
              is_loading_done: true
            })
          }
          tableSource = tableSource.concat(json.saleOrderDetail.saleOrderLine)
          this.setData({
            dataSource: json.saleOrderDetail,
            tableSource: tableSource,
            total: json.lineTotal
          })
        } else {
          wx.showToast({
            title: json.msg,
            icon: "none",
            duration: 1000
          })
        }
      }
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
    var page = this.data.page;
    var total = this.data.total;
    var is_loading_done = this.data.is_loading_done;
    var loading = this.data.loading;
    // console.log(is_loading_done)
    if (!is_loading_done && !loading) {
      this.handleFetch({
        pageSize: 10,
        page: page + 1,
        orderHeaderId: this.data.orderHeaderId,
        custTradePartyId: this.data.tradePartyId,
        authorizedCookie: this.data.authorizedCookie
      })
      this.setData({
        page: page + 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})