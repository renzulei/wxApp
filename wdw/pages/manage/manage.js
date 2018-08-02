// pages/manage/manage.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    num: 1,
    array: ['请选择支付方式', '现金支付', '微信支付', '支付宝支付', '银行卡支付'], //付款方式
    index: 0,
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
    shop1: [],
    shop2: [],
    shop3: [],
    shop4: [],
    shop5: [],
  },

  //事件处理函数
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
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