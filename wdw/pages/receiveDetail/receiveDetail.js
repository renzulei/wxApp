// pages/particulars/particulars.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,//异常收货弹窗
    exceptionMessage:'exceptionMessage',//异常数据key
    selectedRows:[],//被选中的行
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
    if (!util.getStorageSync("userName")) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    };
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    var orderTypeCode = options.orderTypeCode;
    var receiveHeaderId = options.receiveHeaderId;
    this.setData({
      authorizedCookie: authorizedCookie,
      orderTypeCode: orderTypeCode,
      receiveHeaderId: receiveHeaderId
    })
    var userDefaultTradeCompany = util.getStorageSync('userDefaultTradeCompany');
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId || "": "";
    var contactId = userDefaultTradeCompany ? userDefaultTradeCompany.contactId || "": "";
    this.setData({
      tradePartyId: tradePartyId,
      contactId: contactId
    }, () => {
      if (orderTypeCode == "receive") {
        this.handleReceiveFetch(receiveHeaderId, 1, 10);
      } else {
        this.handleShipmentFetch(receiveHeaderId, 1, 10);
      }
    })
  },
  handleReceiveFetch: function (receiveHeaderId,page,pageSize){

    wx.request({
      url: `${authService}/receiveShow/getReceiveDetail?page=${page}&pageSize=${pageSize}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      data: JSON.stringify({
        custTradePartyId: this.data.tradePartyId,
        receiveHeaderId: receiveHeaderId,
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
        var receiveDetail = json.receiveDetail[0];
        if (receiveDetail) {
          switch (receiveDetail.receiveStatusCode) {
            case "R": this.setData({ orderType: "received" }); break;
            case "ER": this.setData({ orderType: "abnormalReceive" }); break;
            case "P": this.setData({ orderType: "waitConfirm" }); break;
            default:
              this.setData({
                dataSource: {},
              });
              wx.showModal({
                title: '温馨提示',
                content: '该订单已全部收货,请返回所有收货单查询或进行其他订单的操作',
                confirmText: '返回',
                success: function (re) {
                  wx.redirectTo({
                    url: '/pages/Administrator/Administrator',
                  })
                }
              })
              
          };
          for (var key in receiveDetail) {
            if (key == 'lines') {
              receiveDetail[key].map((item, i) => {
                item.checked=false;
                item['receiveQuantity'] = item.quantity;
              })
            };
          };
          this.setData({
            total: json.total,
            dataSource: receiveDetail
          });
        }
      }
    })
  },
  handleShipmentFetch: function (receiveHeaderId, page, pageSize){
    wx.request({
      url: `${authService}/shipment/getShipmentDetail?page=${page}&pageSize=${pageSize}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      data: JSON.stringify({
        custTradePartyId: this.data.tradePartyId,
        shipmentHeaderId: receiveHeaderId,
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
        var shipmentDetail = json.shipmentDetail[0];
        switch (shipmentDetail.shipmentStatusCode) {
          case "SHIPPED": this.setData({ orderType: "waitReceive" }); break;
          case "PSHIPED": this.setData({ orderType: "partReceive" }); break;
          default:
            this.setData({
              dataSource: {},
            });
            wx.showModal({
              title: '温馨提示',
              content: '该订单已全部收货,请返回所有收货单查询或进行其他订单的操作',
              confirmText: '返回',
              success: function (re) {
                wx.redirectTo({
                  url: '/pages/Administrator/Administrator',
                })
              }
            })
        };
        for (var key in shipmentDetail) {
          if (key == 'lines') {
            shipmentDetail[key].map((item, i) => {
              item.checked = false;
              item['receiveQuantity'] = item.quantity;
            })
          };
        };
        this.setData({
          total: json.lineTotal,
          dataSource: shipmentDetail
        });
      }
    })
  },
  // 选中的函数
  doSelect:function(e){
    var disabled = e.currentTarget.dataset.disabled;
    var index = e.currentTarget.dataset.index;
    if(!disabled){
      this.data.dataSource.lines.map((it,i)=>{
        if(index == i){
          it.checked = !it.checked;
        }
      })
      this.countSelected(this.data.dataSource.lines);
      this.setData({
        dataSource: this.data.dataSource
      })
    }
  },
  // 获取被选中的行
  countSelected:function(rows){
    var selectedRows = [];
    rows.map((item)=>{
      if(item.checked){
        selectedRows.push(item);
      }
    })
    this.setData({
      selectedRows: selectedRows
    })
    console.log(selectedRows)
  },
  // 待收货状态时确认收货
  confirmReceive:function(){
    if(this.data.selectedRows.length == 0){
      wx.showToast({
        title: '请至少选择一行单据',
        icon: "none",
        duration: 1000
      })
    }else{
      this.data.selectedRows.map((item,i)=>{
        item['receiveStatusCodeFront'] = "R";
        delete item.checked
      })
      this.data.dataSource.lines = this.data.selectedRows;
      this.data.dataSource['receiveStatusCodeFront'] = "R";
      // console.log(this.data.selectedRows)
      wx.request({
        url: `${authService}/shipment/submitShipmentToReceive`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'cookie': this.data.authorizedCookie
        },
        data: JSON.stringify(this.data.dataSource),
        success: (res) => {
          console.log(res.data)
          try {
            util.catchHttpError(res);
          } catch (e) {
            console.error(e)
            return
          }
          var json = res.data;
          if (json.code == "S") {
            this.handleShipmentFetch(this.data.receiveHeaderId,1,10);
          } else {
            wx.showToast({
              title: json.msg,
              icon: "none",
              duration: 1000
            })
          }
        }
      })
    }
  },
  // 待收货状态下的异常收货弹窗
  abnormalReceive:function(){
    if (this.data.selectedRows.length == 0) {
      wx.showToast({
        title: '请至少选择一行单据',
        icon: "none",
        duration: 1000
      })
    } else {
      this.setData({
        showModal:true
      })

    }
  },
  // 关闭弹窗，清除异常信息
  handleCancel:function(){
    var exceptionMessage = this.data.exceptionMessage;
    this.data.selectedRows.map((item,i)=>{
      delete item[exceptionMessage]
    })
    this.setData({
      showModal:false,
      selectedRows: this.data.selectedRows
    })
  },
  onCellChange:function(e){
    var exceptionMessage = this.data.exceptionMessage;
    var index = e.currentTarget.dataset.index;

    this.data.selectedRows.map((item,i)=>{
      if(index == i){
        item[exceptionMessage] = e.detail.value;
      }
    })
    this.setData({
      selectedRows: this.data.selectedRows
    })
  },
// 待收货状态下的确定异常收货
  handleOk:function(){
    wx.showModal({
      title: '提示',
      content: '确认对该订单进行异常收货？',
      success: (re)=> {
        this.setData({
          showModal: false,
        })
        if (re.confirm) {
          this.data.selectedRows.map((item, i) => {
            item['receiveStatusCodeFront'] = "ER";
            delete item.checked
          })
          this.data.dataSource.lines = this.data.selectedRows;
          this.data.dataSource['receiveStatusCodeFront'] = "ER";
          // console.log(this.data.dataSource)
          wx.request({
            url: `${authService}/shipment/submitShipmentToReceive`,
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'cookie': this.data.authorizedCookie
            },
            data: JSON.stringify(this.data.dataSource),
            success: (res) => {
              // console.log(res.data)
              try {
                util.catchHttpError(res);
              } catch (e) {
                console.error(e)
                return
              }
              var json = res.data;
              if (json.code == "S") {
                this.handleShipmentFetch(this.data.receiveHeaderId, 1, 10);
              } else {
                wx.showToast({
                  title: json.msg,
                  icon: "none",
                  duration: 1000
                })
              }
            }
          })
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