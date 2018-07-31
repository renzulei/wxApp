// pages/createOrder/createOrder.js
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

  },

  // 点击取消返回
  cancelTap: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  //  跳转到补充信息页面
  sopTap: function() {
    wx.navigateTo({
      url: '/pages/supplement/supplement',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    }, this.getData)
  },
  getData: function() {
    wx.request({
      url: `${authService}/shopCart/showShopCart?tradePartyId=${this.data.tradePartyId}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      success: (res)=> {
        console.log(res.data)
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        var contact = {}
        var defaultContactPerson = {}
        json.itemList.map((items, i) => {
          this.setData({
            contactId: items.contact.contactId,
            tradePartyId: items.contact.tradePartyId
          })
          contact = items.contact
          defaultContactPerson = contact.defaultContactPerson
          items.items.map((its) => {
            its.contactId = contact.contactId,
              its.address = contact.address,
              its.tradePartyId = contact.tradePartyId
          })
        })
        json.itemList.map((item, i) => {
          let arr = [];
          if (item.items)
            item.items.map((data, i) => {
              data.itemChangableAttributes.map((item) => {
                data[item["attributeCode"]] = item.value;
                if (item["attributeName"] == '幅宽mm'){
                  this.setData({
                    code: item["attributeCode"]
                  })
                }else{
                  this.setData({
                    cutLength: item["attributeCode"]
                  })
                } 
              })
              data.key = i + 1;
              arr.push(data)
            })
          let obj = {}, tableSource = [];
          arr.map(function (item) {
            if (obj.hasOwnProperty(item.itemName)) {
              obj[item.itemName].push(item)
            } else {
              obj[item.itemName] = [];
              obj[item.itemName].push(item);
            }
          })
          Object.keys(obj).map(function (key) {
            tableSource.push([{'itemName':key,'checked':false}, obj[key]])
          })
          console.log(tableSource)
          this.setData({
            tableSource: tableSource //表格数据源
          })
        })
        this.setData({
          data: json.itemList,
          contact: contact,
          defaultContactPerson: defaultContactPerson, //默认收货人
        })
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