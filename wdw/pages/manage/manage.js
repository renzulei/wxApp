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
    page:1,
    pageSize:10,
    payStatusArray: [], //支付状态
    payStatusIndex: -1,
    saleOrderTypeArray:[],
    saleOrderTypeIndex:-1,
    orderNumber:'',
    itemName:'',
    currentTab: 0,
    dataSource:[],//列表数据源
    orderStatusCode:'',//订单状态
    orderTypeCode:'',//订单类型
    loading:false,//是否正在加载
    is_loading_done: false, //是否加载完毕
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
    this.handleFetch({
      page:1,
      pageSize:10
    })
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
        let arr = [];
        Object.keys(json).forEach((k, i) => {
          arr.push({ value: k, label: json[k] });
        })
        console.log(arr)
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
        // console.log(res.data)
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        var saleOrderTypeArray = [{
          value: 'INTE',
          label: '意向订单',
        }]
        if(json.code == 'S'){
          json.saleOrderTypeList.map((item) => {
            saleOrderTypeArray.push({
              value: item.value,
              label: item.meaning,
            })
          });
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
  // 获取订单列表数据
  handleFetch:function({ page, pageSize, orderStatusCode, orderTypeCode }){
    this.setData({
      loading:true
    })
    var tradePartyId = util.getStorageSync('userDefaultTradeCompany') ? util.getStorageSync('userDefaultTradeCompany').tradePartyId : '';
    var contactId = util.getStorageSync('userDefaultTradeCompany') ? util.getStorageSync('userDefaultTradeCompany').contactId:'';
    var data = {}
    data = {
      custTradePartyId: tradePartyId,
      custContactId: contactId,
      orderNumber: this.data.orderNumber || "",
      payStatusCode: this.data.payStatusCode || "",
      itemName: this.data.itemName || "",
      creationDateFrom: "",
      creationDateTo: ""
    }
    if (orderStatusCode) {
      data.orderStatusCode = orderStatusCode == "allorder" ? "" : orderStatusCode 
    }
    if (orderTypeCode){
      data.orderTypeCode = orderTypeCode;
      if (orderTypeCode == 'RET'){
        data.orderStatusCode = 'RETURN'
      }
    }
    // console.log('请求参数data',data)
    wx.request({
      url: `${authService}/saleOrderShow/getAllSaleOrders?page=${page}&pageSize=${pageSize}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      data: JSON.stringify(data),
      success: (res) => {
        // console.log(page,res.data)
        this.setData({
          loading:false
        })
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;

        if (json.code == "S") {
          var dataSource = this.data.dataSource || [];          
          if (json.saleOrderList.length < 10) {
            this.setData({
              is_loading_done: true
            })
          }
          dataSource = dataSource.concat(json.saleOrderList)
          this.setData({
            dataSource: dataSource,
            total: json.total
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
  switchNav(e) {
    var orderStatusCode = e.currentTarget.dataset.code;
    var index = e.currentTarget.dataset.current;
    this.setData({
      orderStatusCode: orderStatusCode
    })
    if (this.data.currentTab != index) {
      this.toInit();
      this.setData({
        currentTab: index
      })
      this.handleFetch({
        page:1,
        pageSize:10,
        orderStatusCode: orderStatusCode,
        orderTypeCode: this.data.orderTypeCode
      })
    }
  },
  // 还原到初始数据
  toInit:function(){
    this.setData({
      dataSource: [],
      page: 1,
      is_loading_done: false
    })
  },
  // 订单编号输入改变
  bindOrderNumberchange:function(e){
    var orderNumber = e.detail.value;
    this.setData({
      orderNumber: orderNumber
    })
  },
  // 商品名称输入改变
  bindItemNamechange: function (e) {
    var itemName = e.detail.value;
    this.setData({
      itemName: itemName
    })
  },
  // 支付状态改变触发事件
  bindPayStatusChange: function(e) {
    var index = e.detail.value;
    this.setData({
      payStatusIndex: index
    });
    this.data.payStatusArray.map((item,i)=>{
      if(index == i){
        this.setData({
          payStatusCode:item.value //支付状态
        })
      }
    })
  },
  // 订单类型改变触发事件
  bindSaleOrderTypeChange: function (e) {
    this.setData({
      orderNumber: '',
      itemName: '',
      payStatusIndex: -1,
      payStatusCode: '',
      orderTypeCode: ''
    })
    var index = e.detail.value;
    this.toInit();
    this.setData({
      saleOrderTypeIndex: index,
    });
    this.data.saleOrderTypeArray.map((item, i) => {
      if (index == i) {
        this.setData({
          orderTypeCode: item.value //订单类型
        })
        this.handleFetch({
          page: 1,
          pageSize: 10,
          orderTypeCode: item.value
        })
      }
    })
  },
  // 清空筛选条件
  resetSearch:function(){
    this.setData({
      orderNumber:'',
      itemName:'',
      payStatusIndex:-1,
      payStatusCode:'',
      saleOrderTypeIndex:-1,
      orderTypeCode:''
    })
  },
  // 搜索
  handleSearch:function(){
    this.toInit();
    this.handleFetch({
      pageSize: 10,
      page: 1,
      orderStatusCode: this.data.orderStatusCode,
      orderTypeCode: this.data.orderTypeCode
    })
  },
  // 订单详情
  particularsTap: function(e) {
    var orderHeaderId = e.currentTarget.dataset.headid;
    wx.navigateTo({
      url: `/pages/particulars/particulars?orderHeaderId=${orderHeaderId}`,
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
    var page = this.data.page;
    var total = this.data.total;
    var is_loading_done = this.data.is_loading_done;
    var loading = this.data.loading;
    // console.log(is_loading_done)
    if (!is_loading_done && !loading) {
      this.handleFetch({
        pageSize: 10,
        page: page + 1,
        orderStatusCode: this.data.orderStatusCode,
        orderTypeCode: this.data.orderTypeCode
      })
      this.setData({
        page: page + 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})