// pages/specification/specification.js
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
    data: [], //表格数据源
    baseOrderQuantity: "",
    unitPrice: "",
    itemId: '',
    dataInTable: null, //初始空行，用作添加新的空行
    allT: 0, //总吨数
    allA: 0 //总金额
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
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    var physicalStateCode = util.getStorageSync('physicalStateCode');
    var items = JSON.parse(util.getStorageSync('items'));
    var changeableAttrs = JSON.parse(util.getStorageSync('changeableAttrs'));
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
          this.setData({
            cutLength: item.attributeCode
          })
          physicalStateCode == "JT" ?
            items[item.attributeCode] = "-" :
            items[item.attributeCode] = ""
        } else {
          this.setData({
            code: item.attributeCode
          })
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

  //复制一行
  copyTap: function(e) {
    var record = e.currentTarget.dataset.record;
    const dataSource = [...this.data.data];
    var deepData = util.deepCopy(this.data.data[0],{})
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
      }, this.doCount);
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
        icon: "none",
        duration: 1000
      })
      return
    }

    let dataS = util.deepCopy(...this.data.dataInTable,{});
    this.setData({
      data: [...this.data.data, dataS]
    })
  },
  // 件数改变触发事件
  orderQuantityChange: function(e) {
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    this.data.data.map((item, i) => {
      if (i == index) {
        item.orderQuantity = isNaN(Number(value).toFixed(0)) ? "" : Number(value).toFixed(0)
      }
    })
    this.setData({
      data: this.data.data
    })
  },
  // 件数离开焦点
  orderQuantityBlur: function(e) {
    let code, cutLength, record;
    var index = e.currentTarget.dataset.index;
    record = this.data.data[index];
    this.data.changeableAttrs ?
      this.data.changeableAttrs.map((item, i) => {
        if (item.attributeName == "幅宽mm") {
          code = item.attributeCode
        } else if (item.attributeName == "切长mm") {
          cutLength = item.attributeCode
        }
      }) : ""
    if (this.data.physicalStateCode == "JT") {
      wx.request({
        url: `${authService}/common/getItemTonQuantity?itemId=${this.data.itemId}&pieceQty=${Number(record.orderQuantity)}&rangeWidth=${record[code]}`,
        method: "POST",
        header: {
          'Content-Type': 'application/json',
          'cookie': this.data.authorizedCookie
        },
        success: (res) => {
          try {
            util.catchHttpError(res);
          } catch (e) {
            console.error(e)
            return
          }
          var json = res.data;
          if (json) {
            this.data.data.map((item, i) => {
              if (i == index) {
                item.baseOrderQuantity = json
                item.amount = (Number(item.baseOrderQuantity) * Number(item.unitPrice)).toFixed(2)
              }
            })
          } else {
            this.data.data.map((item, i) => {
              if (i == index) {
                item.baseOrderQuantity = 0
                item.amount = 0
              }
            })
          }
          this.setData({
            data: this.data.data
          }, this.doCount)
        },
      })
    } else if (this.data.physicalStateCode == "PZ") {
      wx.request({
        url: `${authService}/common/getItemPZTonQuantity?itemId=${this.data.itemId}&pieceQty=${Number(record.orderQuantity)}&rangeWidth=${record[code]}&cutLength=${record[cutLength]}`,
        method: "POST",
        header: {
          'Content-Type': 'application/json',
          'cookie': this.data.authorizedCookie
        },
        success: (res) => {
          try {
            util.catchHttpError(res);
          } catch (e) {
            console.error(e)
            return
          }
          var json = res.data;
          if (json) {
            this.data.data.map((item, i) => {
              if (i == index) {
                item.baseOrderQuantity = json
                item.amount = (Number(record.baseOrderQuantity) * Number(record.unitPrice)).toFixed(2);
              }
            })
          } else {
            this.data.data.map((item, i) => {
              if (i == index) {
                item.baseOrderQuantity = ""
                item.amount = 0
              }
            })
          }
          this.setData({
            data: this.data.data
          }, this.doCount)
        }
      })
    }
  },
  // 吨数改变触发事件
  baseOrderQuantityChange: function(e) {
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var record = this.data.data[index];
    if (value) {
      this.data.data.map((item, i) => {
        if (i == index) {
          if (value != record.baseOrderQuantity) {
            item.orderQuantity = 0
          }
          item.baseOrderQuantity = value;
        }
      })
    } else {
      this.data.data.map((item, i) => {
        if (i == index) {
          item.baseOrderQuantity = 0
        }
      })
    }
    this.setData({
      data: this.data.data
    })
  },
  // 吨数离开焦点
  baseOrderQuantityBlur: function(e) {
    var value = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var record = this.data.data[index];
    this.data.data.map((item, i) => {
      if (i == index) {
        item.baseOrderQuantity = Number(record.baseOrderQuantity).toFixed(3)
        item.amount = (Number(record.baseOrderQuantity) * Number(record.unitPrice)).toFixed(2);
      }

    })
    this.setData({
      data: this.data.data,
    }, this.doCount)
  },
  doCount: function() {
    var allT = 0,
      allA = 0;
    this.data.data.map((item, i) => {
      allT += Number(item.baseOrderQuantity);
      allA += Number(item.amount);
    })
    this.setData({
      allT: allT,
      allA: allA
    })
  },
  // 幅宽和切长离开焦点触发函数
  attributeBlur: function(e) {
    var attributeCode = e.currentTarget.dataset.code;
    var index = e.currentTarget.dataset.index;
    var value = e.detail.value;
    value = value < 100 ? 100 : value > 9999 ? 9999 : value;
    var record = this.data.data[index];
    if (!Number(value)) {
      record[attributeCode] = null
    } else {
      this.data.data.map((items, i) => {
        if (i == index) {
          if (value != record[attributeCode]) {
            items.orderQuantity = 0
            items.baseOrderQuantity = 0
            items.amount = 0
          }
          items[attributeCode] = value
        }
      })
    }
    this.setData({
      data: this.data.data,
    }, this.doCount)
  },
  // 加入购物车
  addCart: function(e) {
    let notSend = true
    if (!this.data.data.length) {
      wx.showToast({
        title: '请至少添加一行规格参数！',
        icon: 'none',
        duration: 1000
      })
      return
    }
    this.data.data.map((item) => {
      for (let i in item) {
        if (i != "key") {
          if (i != "orderQuantity")
            if (i != "operation")
              if (i == "baseOrderQuantity") {
                if (!Number(item[i])) {
                  notSend = false
                }
              } else {
                if (!item[i]) {
                  notSend = false
                }
              }
        }
      }
    })
    if (!notSend) {
      wx.showToast({
        title: '请将信息填写完整,再添加到购物车',
        icon: 'none',
        duration: 1000
      })
      return
    }
    let dataSource = this.data.data;
    dataSource.map((item, i) => {
      var mapAttr = util.deepCopy(this.data.changeableAttrs,[]);
      mapAttr.map((it) => {
        let tp = it.attributeCode
        it.value = item[tp]
      })
      item.key = i;
      item.itemId = this.data.items.itemId;
      item.itemChangableAttributes = mapAttr;
      item.itemFixedAttributes = [];
      item.physicalStateCode = this.data.physicalStateCode
    });
    let user = util.getStorageSync('userName');
    if (user) {
      if (this.data.items.itemId) {
        if (!util.getStorageSync("userDefaultTradeCompany").tradePartyId) {
          wx.showToast({
            title: '此收货地址不存在，无法添加购物车！',
            icon:'none',
            duration:1500
          })
        } else {
          wx.request({
            url: `${authService}/shopCart/addItemToCart?contactId=${util.getStorageSync("userDefaultTradeCompany").contactId || ""}&tradePartyId=${util.getStorageSync("userDefaultTradeCompany").tradePartyId}`,
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'cookie': this.data.authorizedCookie
            },
            data: JSON.stringify(dataSource),
            success:function(res){
              try{
                util.catchHttpError(res)
              }catch(e){
                console.error(e)
              }
              var json = res.data;
              if (json.code == "S") {
                wx.showModal({
                  title: '添加购物车成功',
                  content: '添加购物车成功，点击立即下单前往购物车！',
                  cancelText:'继续购物',
                  confirmText:'立即下单',
                  success: function (re) {
                    if (re.confirm) {
                      wx.redirectTo({
                        url: '/pages/createOrder/createOrder',
                      })
                    } else if (re.cancel) {
                      wx.switchTab({
                        url: '/pages/proList/proList',
                      })
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: json.msg,
                  icon:'none',
                  duration:1500
                })
              }
            }
          })
        }
      } else {
        wx.showToast({
          title: '请您先选择物料，再填写规格要求!',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
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
