var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var cmService = app.globalData.cmService;
var customer_id = app.globalData.customer_id
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgc: "/images/bgc.png",
    searchValue: '',
    businessExplain:[],
    article: [],
    data: {}, //商品请求接口时携带数据
    shop:[] //商品列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function(options) {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    console.log(authorizedCookie)
    var userDefaultTradeCompany = util.getStorageSync('userDefaultTradeCompany');
    var partyName = userDefaultTradeCompany ? userDefaultTradeCompany.partyName : "";
    var address = userDefaultTradeCompany ? userDefaultTradeCompany.address : "";
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId : "";
    var contactId = userDefaultTradeCompany ? userDefaultTradeCompany.contactId : "";
    this.setData({
      partyName: partyName,
      address: address,
      tradePartyId: tradePartyId,
      contactId: contactId,
      authorizedCookie: authorizedCookie
    })
   
    this.dataInof(); // 促销商品
    this.getInof();// 供应链
  },
  // 搜索框键盘输入值处理函数
  upSeachValue: function(e) {
    var searchValue = e.detail.value;
    this.setData({
      searchValue: searchValue,
    })
  },
  // 搜索
  handleSearch: function() {
    var searchValue = this.data.searchValue;
    app.globalData.searchContent = searchValue;
    wx.switchTab({
      url: '/pages/proList/proList',
    })
  },

  //促销商品数据
  dataInof: function() {
    var data = this.data.data
    data.saleCountSort = this.data.saleCountSortName || ''
    data.priceSort = this.data.priceSortName || ''
    //获取商品数据
    if (this.data.searchValue) {
      data.searchBoxContext = this.data.searchValue;
    }
    this.fetch({
      pageSize: 10,
      current: 1,
      data: data
    })
  },
  // 根据筛选条件请求商品列表数据
  fetch: function(params = {}) {
    // console.log(params)
    var that = this;
    var tradePartyId = this.data.tradePartyId;
    var contactId = this.data.contactId;
    wx.showLoading({
      title: "加载中...",
      mask: true
    })
    wx.request({
      url: `${cmService}/product/getProductByCondition?page=${params.current}&pageSize=${params.pageSize}&tradePartyId=${tradePartyId}&contactId=${contactId}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': util.noLoginCookie
      },
      data: JSON.stringify(params.data),
      complete: function() {
        wx.hideLoading()
      },
      success: function(res) {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var data = res.data;
        let shop = [];
        data.content.map((item, i) => {
          var item = JSON.parse(item)
          item.key = i
          if (item.itemAttributes) {
            item.itemAttributes.map((it, i) => {
              if (it.attributeCode == "Y033")
                item.fixedAttributeValue = it.fixedAttributeValue
            })
          }
          shop.push(item)
        })
        console.log(shop)
        that.setData({
          shop: shop,
          total: data.total
        })
      }
    })
  },
  // 供应链数据
  getInof: function() {
    var that = this;
    wx.request({
      url: `${cmService}/businessExplain/query?region=GYLJR`,
      // url: `https://yz.wangreat.com/core/restapi/public/businessExplain/query?region=GYLJR`,
      data: {},
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': '__wgl=' + wx.getStorageSync('__wgl')
      },
      success: function(res) {
        // try {
        //   util.catchHttpError(res);
        // } catch (e) {
        //   console.error(e)
        //   return
        // }
        var json = res.data;
        // console.log(res);
        that.setData({
          businessExplain: json.businessExplain,
          categoryName: json.categoryName,
          businessIconUrl: json.businessIconUrl,
        })
        var replyArr = [];
        json.businessExplain.map(function(item,i){
          replyArr.push(item.simpleContent);
        })
        // console.log(replyArr)
        for (let i = 0; i < replyArr.length; i++) {
          WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
          if (i === replyArr.length - 1) {
            WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
          }
        }
      }
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