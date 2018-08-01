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
    tableSource: [], //表格数据源
    folders: [], //商品列表是否折叠
    data: null, //接口返回的原始数据
    contact: null, //接口返回的附加信息
    defaultContactPerson: null, //默认收货人
    selectedRows: [], //被选中的商品数据
    allA: 0, //总金额
    allT: 0, //总吨数
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
  // 获取购物车数据
  getData: function() {
    wx.request({
      url: `${authService}/shopCart/showShopCart?tradePartyId=${this.data.tradePartyId}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
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
                if (item["attributeName"] == '幅宽mm') {
                  this.setData({
                    code: item["attributeCode"]
                  })
                } else {
                  this.setData({
                    cutLength: item["attributeCode"]
                  })
                }
              })
              data.key = i + 1;
              arr.push(data)
            })
          // 以下代码对数据按商品名称分组
          let obj = {},
            tableSource = [],
            folders = [];
          arr.map(function(item) {
            if (obj.hasOwnProperty(item.itemName)) {
              item.checked = false;
              obj[item.itemName].push(item)
            } else {
              item.checked = false;
              obj[item.itemName] = [];
              obj[item.itemName].push(item);
            }
          })
          Object.keys(obj).map(function(key) {
            folders.push({
              fold: true
            })
            tableSource.push([{
              'itemName': key,
              'checked': false
            }, obj[key]])
          })
          folders[0].fold = false;
          // console.log(tableSource)
          this.setData({
            tableSource: tableSource,
            folders: folders
          })
        })
        this.setData({
          data: json.itemList,
          contact: contact,
          defaultContactPerson: defaultContactPerson,
        })
      }
    })
  },
  // 选中一类商品
  checkSome: function(e) {
    var outIndex = e.currentTarget.dataset.outindex;
    var selectedRows = [],
      allA = 0,
      allT = 0;
    this.data.tableSource.map(function(item, index) {
      if (index == outIndex) {
        item[0].checked = !item[0].checked;
        item[1].map(function(it, i) {
          item[0].checked ? it.checked = true : it.checked = false;
        })
      }
    })
    this.data.tableSource.map(function(item, index) {
      item[1].map(function(it, i) {
        it.checked ? selectedRows.push(it) : '';
      })
    })
    selectedRows.map(function(it, i) {
      allA += Number(it.amount);
      allT += Number(it.baseOrderQuantity);
    })
    allT = allT.toFixed(3) //吨数保留三位小数
    this.setData({
      tableSource: this.data.tableSource,
      selectedRows: selectedRows,
      allA: allA,
      allT: allT
    })
  },
  // 选中一个商品
  checkOne: function(e) {
    var outIndex = e.currentTarget.dataset.outindex;
    var innerIndex = e.currentTarget.dataset.index;
    var selectedRows = [],
      allA = 0,
      allT = 0;
    this.data.tableSource.map(function(item, index) {
      if (index == outIndex) {
        item[0].checked = true;
        item[1].map(function(it, i) {
          i == innerIndex ? it.checked = !it.checked : '';
          it.checked == false ? item[0].checked = false : '';
        })
      }
    })
    this.data.tableSource.map(function(item, index) {
      item[1].map(function(it, i) {
        it.checked ? selectedRows.push(it) : '';
      })
    })
    // console.log(selectedRows)
    selectedRows.map(function(it, i) {
      allA += Number(it.amount);
      allT += Number(it.baseOrderQuantity);
    })
    allT = allT.toFixed(3) //吨数保留三位小数
    this.setData({
      tableSource: this.data.tableSource,
      selectedRows: selectedRows,
      allA: allA,
      allT: allT
    })
  },
  // 折叠或展开一类商品列表
  doFold: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.folders.map(function(it, i) {
      i == index ? it.fold = !it.fold : ""
    })
    this.setData({
      folders: this.data.folders
    })
  },
  // 删除一个商品
  onDelete: function(e) {
    var record = e.currentTarget.dataset.item;
    wx.request({
      url: `${authService}/shopCart/delShopCartItem?contactId=${record.contactId}&tradePartyId=${record.tradePartyId}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      data: JSON.stringify({
        inventId: record.inventId,
        itemId: record.itemId,
      }),
      success: (res) => {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var json = res.data;
        if (json.code == "S") {

          this.getData()
          this.setData({
            selectedRows: []
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