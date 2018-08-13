// pages/manage/manage.js
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
    num: 1,
    payStatusArray: [], //支付状态
    payStatusIndex: 0,
    saleOrderTypeArray:[],
    saleOrderTypeIndex:0,
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [{
        text: '所有订单'
      },
      {
        text: '已提交'
      },
      {
        text: '已关闭'
      },
      {
        text: '已取消'
      },
      {
        text: '异常'
      },
      {
        text: '已审核'
      },
      
    ],
    currentTab: 0,
    navScrollLeft: 0,
    shop0: [
      {
      ding_dan: "YCD0018652",
      jin_e: "￥6178430.0",
      zhuang_tai: "待发货",
      xiadan_shijian: "2018-01-26 15:36:21"
    },    
      {
        ding_dan: "YCD0018652",
        jin_e: "￥6178430.0",
        zhuang_tai: "待发货",
        xiadan_shijian: "2018-01-26 15:36:21"
      },  
      {
        ding_dan: "YCD0018652",
        jin_e: "￥6178430.0",
        zhuang_tai: "待发货",
        xiadan_shijian: "2018-01-26 15:36:21"
      },  
     ],
  },

  //事件处理函数
  onLoad: function() {
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
    if (!util.getStorageSync("userName")) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    this.getPayStatus(authorizedCookie)
    this.getConditions(contactId, authorizedCookie)
  },
  // 支付状态请求
  getPayStatus: function (authorizedCookie){
    wx.request({
      url: `${authService}/common/lookUpValue?code=OM.ORDER_PAYMENT_STATUS`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': authorizedCookie
      },
      success: (res)=> {
        // console.log(res.data)
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        let arr = [{
          label:'请选择支付状态',
          value:''
        }]
        Object.keys(json).forEach((k, i) => {
          arr.push({ value: k, label: json[k] });
        })
        // console.log(arr)
        this.setData({ payStatusArray: arr })
      }
    })
  },
  // 获取筛选条件
  getConditions: function (contactId, authorizedCookie){
    wx.request({
      url: `${umService}/saleOrderShow/saleOrderListCondition?contactId=${contactId}`,
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
        var saleOrderTypeArray = [{
          value: '',
          label: '请选择订单类型',
        },{
          value: 'INTE',
          label: '意向订单',
        }]
        if(json.code == 'S'){
          json.saleOrderTypeList.map((item) => {
            saleOrderTypeArray.push({
              value: item.value,
              label: item.meaning,
            })
          })
          this.setData({
            saleOrderTypeArray: saleOrderTypeArray,
            saleOrderStatusList: json.saleOrderStatusList
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
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    if (this.data.currentTab != cur) {
      this.setData({
        currentTab: cur
      })
    }
  },
  // ------------------------------------------------------------------------------------------------------------
  bindPickerChange: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },
  // 订单详情
  particularsTap: function(e) {
    wx.navigateTo({
      url: '/pages/particulars/particulars',
    })
  },

  // nav点击事件
  navTap: function(e) {
    console.log(e)
    var num = this.data.num;
    this.setData({
      num: e.target.dataset.num
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