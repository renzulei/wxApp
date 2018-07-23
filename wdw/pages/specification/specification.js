// pages/specification/specification.js
var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
const authorizedCookie = util.authorizedCookie;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [], //表格数据源
    baseOrderQuantity: "",
    unitPrice: "",
    itemId: '',
    dataInTable: null, //初始空行，用作添加新的空行
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //  this.setData({
    //    physicalStateCode: options.physicalStateCode,
    //    items: JSON.parse(options.items),
    //    changeableAttrs: JSON.parse(options.changeableAttrs)
    //  })
    var physicalStateCode = wx.getStorageSync('physicalStateCode');
    var items = JSON.parse(wx.getStorageSync('items'));
    var changeableAttrs = JSON.parse(wx.getStorageSync('changeableAttrs'));
    console.log(physicalStateCode, items, changeableAttrs)
    this.setData({
      physicalStateCode: physicalStateCode,
      items: items,
      changeableAttrs: changeableAttrs,
      itemId: items.itemId,
      unitPrice: items.unitPrice
    })
    let data = [{
      itemName: items.itemName,
      unitPrice: items.unitPrice,
      orderQuantity: '',
      baseOrderQuantity: this.data.baseOrderQuantity,
      amount: '',

    }];
    changeableAttrs ? changeableAttrs.map((item, i) => {
      data.map((items, i) => {
        if (item.attributeName == "切长mm") {
          physicalStateCode == "JT" ?
            items[item.attributeCode] = "-" :
            items[item.attributeCode] = ""
        } else {
          items[item.attributeCode] = ''
        }
      })
    }) : ""
    this.setData({
      data: data,
      dataInTable: data
    })
  },

  // 返回proList产品列表页
  cancelTap: function() {
    console.log(1111111);
    wx.switchTab({
      url: "/pages/proList/proList"
    })
  },

  // 创建订单页面
  shoppingTap: function() {
    wx.navigateTo({
      url: '/pages/createOrder/createOrder',
    })
  },
  // 复制函数
  deepCopy: (p, c) => {
    var copy = c || {};
    for (var i in p) {
      if (!p.hasOwnProperty(i)) {
        continue;
      }
      if (typeof p[i] === 'object' && p[i] != null) {
        copy[i] = (p[i].constructor === Array) ? [] : {};
        this.deepCopy(p[i], copy[i]);
      } else {
        copy[i] = p[i];
      }
    }
    return copy;
  },
  //复制一行
  copyTap: function(e) {
    var record = e.currentTarget.dataset.record;
    const dataSource = [...this.data.data];
    var deepData = this.deepCopy(this.data.data[0])
    console.log(deepData)
    for (let i in deepData) {
      for (let j in record) {
        if (i = j) {
          if (deepData[i])
            deepData[i] = record[j]
        }
      }
    }
    dataSource.push(deepData)
    this.setData({
      data: dataSource
    });
  },
  deleteTap: function(e) {
    var index = e.currentTarget.dataset.index;
    if (this.data.data.length > 1) {
      const dataSource = [...this.data.data];
      dataSource.splice(index, 1);
      this.setData({
        data: dataSource
      });
    }
  },
  handleAdd: function() {
    // 验证是否填写完毕
    let Send = true
    this.data.data.map((item) => {
      for (let i in item) {
        item[i].value
        if (i != "key") {
          if (i != "orderQuantity")
            if (i != "operation")
              if (i == "baseOrderQuantity") {
                if (!Number(item[i])) {
                  Send = false
                }
              } else {
                if (!item[i]) {
                  Send = false
                }
              }
        }
      }
    })
    if (!Send) {
      wx.showToast({
        title: '请将信息填写完整',
        icon:"none",
        duration:1000
      })
      return
    }

    let dataS = this.deepCopy(...this.data.dataInTable);
    console.log(dataS);
    this.setData({
      data: [...this.data.data, dataS]
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