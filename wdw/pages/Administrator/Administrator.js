var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
// pages/Administrator/Administrator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pageSize:10,
    currentTab: 0,
    navScrollLeft: 0,
    shipmentStatusCodes: ['SHIPPED','PSHIPED'],//待收货状态码
    receiveStatusCodes: ['R'],//已收货状态码
    errReceiveStatusCodes: ['ER', 'P'],//异常收货状态码
    shipmentList:[], //待收货列表
    receiveList:[], // 已收货列表
    errReceiveList:[],//异常收货列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (!util.getStorageSync("userName")) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    };
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
    },this.getShipmentList)
    
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
  switchNav(cur) {
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab != cur) {
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
  // 待收货
  getShipmentList:function(){
    this.switchNav(0)
    this.setData({
      shipmentList: [],
      shipmentTotal:0,
      page: 1,
      pageSize: 10
    }, this.fetchShipmentList({
        page: 1,
        pageSize: 10,
        shipmentStatusCodes: this.data.shipmentStatusCodes
    }))
    
  },
    //发货查询的API
  fetchShipmentList:function(params){
    wx.request({
      url: `${authService}/shipment/getShipmentList?page=${params.page}&pageSize=${params.pageSize}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      data: JSON.stringify({
        custTradePartyId: this.data.tradePartyId,
        itemName: '',
        saleOrderNumber: '',
        receiveDateFrom: '',
        receiveDateTo: '',
        shipmentStatusCodes: params.shipmentStatusCodes,
        custContactId: this.data.contactId,
      }),
      success: (res) => {
        console.log(res.data)
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        var shipmentList = this.data.shipmentList;
        if (json.code == "S" && json.shipmentList.length >= 0) {
          json.shipmentList.map((item, i) => {
            shipmentList.push(item)
          })
          this.setData({
            shipmentList: shipmentList,
            shipmentTotal: json.total,
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
  //收货查询的API
  fetchReceiveList:function(params){
    wx.request({
      url: `${authService}/receiveShow/getReceiveList?page=${params.page}&pageSize=${params.pageSize}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      data: JSON.stringify({
        custTradePartyId: this.data.tradePartyId,
        itemName: '',
        saleOrderNumber: '',
        receiveDateFrom: '',
        receiveDateTo: '',
        receiveStatusCodes: params.receiveStatusCodes,
        custContactId: this.data.contactId,
      }),
      success: (res) => {
        console.log(res.data)
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        if (params.receiveStatusCodes.length == 1){
          var receiveList = this.data.receiveList;
          if (json.code == "S" && json.receiveList.length >= 0) {
            json.receiveList.map((item, i) => {
              receiveList.push(item)
            })

            this.setData({
              receiveList: receiveList,
              receiveTotal: json.total,
            })
          } else {
            wx.showToast({
              title: json.msg,
              icon: "none",
              duration: 1000
            })
          }
        }else{
          var errReceiveList = this.data.errReceiveList;
          if (json.code == "S" && json.receiveList.length >= 0) {
            json.receiveList.map((item, i) => {
              errReceiveList.push(item)
            })
            this.setData({
              errReceiveList: errReceiveList,
              errReceiveTotal: json.total,
            })
          } else {
            wx.showToast({
              title: json.msg,
              icon: "none",
              duration: 1000
            })
          }
        }
        
      }
    })

  },
  // 已收货
  getReceiveList: function () {
    this.switchNav(1);
    //收货查询的API
   this.setData({
     receiveList:[],
     receiveTotal:0,
     page:1,
     pageSize:10
   },this.fetchReceiveList({
       page: 1, 
       pageSize: 10, 
       receiveStatusCodes: this.data.receiveStatusCodes
   }))
  },

  // 异常收货
  getErrReceiveList: function () {
    this.switchNav(2);
    this.setData({
      errReceiveList:[],
      errReceiveTotal:0,
      page: 1,
      pageSize: 10
    }, this.fetchReceiveList({
        page: 1,
        pageSize: 10,
        receiveStatusCodes: this.data.errReceiveStatusCodes
    }))

  },
  // 待收货加载更多
  shipmentMore:function(){
    var shipmentStatusCodes = this.data.shipmentStatusCodes;
    var page = this.data.page+1,
      pageSize = this.data.pageSize;
      this.setData({
        page:page
      })
    this.fetchShipmentList({
      page, pageSize, shipmentStatusCodes
    })
  },
  // 异常收货加载更多
  errReceiveMore:function(){
    var receiveStatusCodes = this.data.errReceiveStatusCodes;
    var page = this.data.page+1,
      pageSize = this.data.pageSize;
      this.setData({
        page: page
      })
    this.fetchReceiveList({
      page, pageSize, receiveStatusCodes
    })
  },
  // 已收货加载更多
  receiveMore: function () {
    var receiveStatusCodes = this.data.receiveStatusCodes;
    var page = this.data.page + 1,
      pageSize = this.data.pageSize;
    this.setData({
      page: page
    })
    this.fetchReceiveList({
      page, pageSize, receiveStatusCodes
    })
  },
  // 点击跳转到订单详情页
  particularsTap: function(event) {
    wx.navigateTo({
      url: '/pages/particulars/particulars',
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