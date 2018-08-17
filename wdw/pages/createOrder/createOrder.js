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
    allOrder:[], //所有订单
    tableSource: [], //表格数据源
    folders: [], //商品列表是否折叠
    data: null, //接口返回的原始数据
    contact: null, //接口返回的附加信息
    defaultContactPerson: '', //默认收货人
    selectedRows: [], //被选中的商品数据
    allA: 0, //总金额
    allT: 0, //总吨数
    jump:true,//是否跳到下一个页面
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
        let allOrder = [];
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
          // folders[0].fold = false;
          allOrder.push({
            allA:Number(0).toFixed(2),
            allT: Number(0).toFixed(3),
            tableSource: tableSource,
            folders: folders,
            contact:item.contact
          })
        })
        console.log(allOrder)
        this.setData({
          data: json.itemList,
          contact: contact,
          defaultContactPerson: defaultContactPerson,
          allOrder:allOrder
        })
      }
    })
  },
  // 选中一类商品
  checkSome: function(e) {
    var outIndex = e.currentTarget.dataset.outindex;
    var innerIndex = e.currentTarget.dataset.index;
    this.data.allOrder.map(function(item, index) {
      if(outIndex == index){
        item.tableSource.map((it, i) => {
          if (i == innerIndex) {
            it[0].checked = !it[0].checked;
            it[1].map(function (t) {
              it[0].checked ? t.checked = true : t.checked = false;
            })
          }
        })
      }
    })
    this.countSelected(this.data.allOrder);
  },
  // 选中一个商品
  checkOne: function(e) {
    var outIndex = e.currentTarget.dataset.outindex;
    var middIndex = e.currentTarget.dataset.mdindex;
    var innerIndex = e.currentTarget.dataset.index;
    this.data.allOrder.map((itemOut,indexOut)=>{
      if(indexOut == outIndex){
        itemOut.tableSource.map(function (item, index) {
          if (index == middIndex) {
            item[0].checked = true;
            item[1].map(function (it, i) {
              i == innerIndex ? it.checked = !it.checked : '';
              it.checked == false ? item[0].checked = false : '';
            })
          }
        })
      }
    })
    this.countSelected(this.data.allOrder);
  },
  // 计算被选中的商品
  countSelected: function(allOrder) {
    var selectedRows = [];
    allOrder.map((itemOut,indexOut)=>{
      selectedRows[indexOut] = [];
      itemOut.tableSource.map(function (item, index) {
        item[1].map(function (it, i) {
          it.checked ? selectedRows[indexOut].push(it) : '';
        })
      })
    })
    selectedRows.map((item,index)=>{
      var allA = 0,
        allT = 0;
      item.map(function (it, i) {
        allA += Number(it.amount);
        allT += Number(it.baseOrderQuantity);
      })
      allT = allT.toFixed(3) //吨数保留三位小数
      allA = allA.toFixed(2) //金额数保留2位小数
      allOrder[index].allA = allA;
      allOrder[index].allT = allT;
    })
    // console.log(selectedRows)
    // console.log(allOrder)
    this.setData({
      selectedRows: selectedRows,
      allOrder: allOrder
    })
  },
  // 折叠或展开一类商品列表
  doFold: function(e) {
    var index = e.currentTarget.dataset.index;
    var outIndex = e.currentTarget.dataset.outindex;
    this.data.allOrder.map((itemOut,indexOut)=>{
      if (indexOut == outIndex){
        itemOut.folders.map(function (it, i) {
          i == index ? it.fold = !it.fold : ""
        })
      }
    })
    this.setData({
      allOrder: this.data.allOrder
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
  // 件数改变触发事件
  orderQuantityChange: function(e) {
    var value = e.detail.value;
    var innerIndex = e.currentTarget.dataset.index;//最内层数组索引
    var middIndex = e.currentTarget.dataset.mdindex;//中间层数组索引
    var outIndex = e.currentTarget.dataset.outindex;//最外层数组索引
    this.data.allOrder.map((itemOut, indexOut) => {
      if (indexOut == outIndex) {
        itemOut.tableSource.map(function (item, index) {
          if (index == middIndex) {
            item[1].map(function (it, i) {
              i == innerIndex ? it.orderQuantity = isNaN(Number(value).toFixed(0)) ? "" : Number(value).toFixed(0) : '';
            })
          }
        })
      }
    })
    
    this.setData({
      allOrder: this.data.allOrder,
    })
  },
  // 件数获得焦点事件
  orderQuantityFocus: function(e) {
    var value = e.detail.value,
      orderQuantityValue; //临时变量，用于记录获取焦点时的初始值。当离开焦点时，如果输入框的值等于初始值则不发出请求
    if (!value) {
      orderQuantityValue = ""
    } else {
      orderQuantityValue = value
    }
    this.setData({
      orderQuantityValue: orderQuantityValue
    })
  },
  // 件数离开焦点触发事件
  orderQuantityBlur: function(e) {
    var value = e.detail.value;
    var innerIndex = e.currentTarget.dataset.index;//最内层数组索引
    var middIndex = e.currentTarget.dataset.mdindex;//中间层数组索引
    var outIndex = e.currentTarget.dataset.outindex;//最外层数组索引
    var record, code = this.data.code,
      cutLength = this.data.cutLength;
    this.data.allOrder.map((itemOut, indexOut) => {
      if (indexOut == outIndex) {
        itemOut.tableSource.map(function (item, index) {
          if (index == middIndex) {
            item[1].map(function (it, i) {
              i == innerIndex ? record = it : '';
            })
            if (!record.orderQuantity) {
              record.orderQuantity = ""
            }
          }
        })
      }
    })
    
    if (record.physicalStateCode == "JT") {
      if (this.data.orderQuantityValue != value)
        wx.request({
          url: `${authService}/common/getItemTonQuantity?itemId=${record.itemId}&pieceQty=${Number(record.orderQuantity).toFixed(0)}&rangeWidth=${record[code]}`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'cookie': this.data.authorizedCookie
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
            if (json) {
              this.data.allOrder.map((itemOut, indexOut) => {
                if (indexOut == outIndex) {
                  itemOut.tableSource.map(function (item, index) {
                    if (index == middIndex) {
                      item[1].map(function (it, i) {
                        if (i == innerIndex) {
                          it.baseOrderQuantity = (Number(json)).toFixed(3)
                          it.amount = (Number(json) * Number(it.unitPrice)).toFixed(2);
                        }
                      })
                    }
                  })
                }
              })
              
            } else {
              this.data.allOrder.map((itemOut, indexOut) => {
                if (indexOut == outIndex) {
                  itemOut.tableSource.map(function (item, index) {
                    if (index == middIndex) {
                      item[1].map(function (it, i) {
                        if (i == innerIndex) {
                          it.baseOrderQuantity = 0
                          it.amount = 0;
                        }
                      })
                    }
                  })
                }
              })
            }
            this.countSelected(this.data.allOrder);
          }
        })
    } else if (record.physicalStateCode == "PZ") {
      if (this.data.orderQuantityValue != value)
        wx.request({
          url: `${authService}/common/getItemPZTonQuantity?itemId=${record.itemId}&pieceQty=${Number(record.orderQuantity)}&rangeWidth=${record[code]}&cutLength=${record[cutLength]}`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'cookie': this.data.authorizedCookie
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
            if (json) {
              this.data.allOrder.map((itemOut, indexOut) => {
                if (indexOut == outIndex) {
                  itemOut.tableSource.map(function (item, index) {
                    if (index == middIndex) {
                      item[1].map(function (it, i) {
                        if (i == innerIndex) {
                          it.baseOrderQuantity = (Number(json)).toFixed(3)
                          it.amount = (Number(json) * Number(it.unitPrice)).toFixed(2);
                        }
                      })
                    }
                  })
                }
              })
            } else {
              this.data.allOrder.map((itemOut, indexOut) => {
                if (indexOut == outIndex) {
                  itemOut.tableSource.map(function (item, index) {
                    if (index == middIndex) {
                      item[1].map(function (it, i) {
                        if (i == innerIndex) {
                          it.baseOrderQuantity = ''
                          it.amount = 0;
                        }
                      })
                    }
                  })
                }
              })
            }
            this.countSelected(this.data.allOrder);
          }
        })
    }
  },
  // 吨数改变触发事件
  baseOrderQuantityChange: function(e) {
    var value = e.detail.value;
    var innerIndex = e.currentTarget.dataset.index;//最内层数组索引
    var middIndex = e.currentTarget.dataset.mdindex;//中间层数组索引
    var outIndex = e.currentTarget.dataset.outindex;//最外层数组索引
    if (value) {
      this.data.allOrder.map((itemOut, indexOut) => {
        if (indexOut == outIndex) {
          itemOut.tableSource.map(function (item, index) {
            if (index == middIndex) {
              item[1].map(function (it, i) {
                if (i == innerIndex) {
                  if (value != it.baseOrderQuantity) {
                    it.orderQuantity = ''
                  }
                  it.baseOrderQuantity = value;
                }
              })
            }
          })
        }
      })
    } else {
      this.data.allOrder.map((itemOut, indexOut) => {
        if (indexOut == outIndex) {
          itemOut.tableSource.map(function (item, index) {
            if (index == middIndex) {
              item[1].map(function (it, i) {
                if (i == innerIndex) {
                  it.baseOrderQuantity = 0;
                }
              })
            }
          })
        }
      })
    }
    this.setData({
      allOrder: this.data.allOrder,
    })
  },
  // 吨数离开焦点触发事件
  baseOrderQuantityBlur: function(e) {
    var value = e.detail.value;
    var innerIndex = e.currentTarget.dataset.index;//最内层数组索引
    var middIndex = e.currentTarget.dataset.mdindex;//中间层数组索引
    var outIndex = e.currentTarget.dataset.outindex;//最外层数组索引
    this.data.allOrder.map((itemOut, indexOut) => {
      if (indexOut == outIndex) {
        itemOut.tableSource.map(function (item, index) {
          if (index == middIndex) {
            item[1].map(function (it, i) {
              if (i == innerIndex) {
                it.baseOrderQuantity = Number(value).toFixed(3);
                it.amount = (Number(it.baseOrderQuantity) * Number(it.unitPrice)).toFixed(2);
              }
            })
          }
        })
      }
    })

    this.countSelected(this.data.allOrder);
  },
  // 幅宽或切长离开焦点触发事件
  attributeBlur:function(e){
    var attributeCode = e.currentTarget.dataset.code;
    var innerIndex = e.currentTarget.dataset.index;//最内层数组索引
    var middIndex = e.currentTarget.dataset.mdindex;//中间层数组索引
    var outIndex = e.currentTarget.dataset.outindex;//最外层数组索引
    var value = e.detail.value;
    value = value < 100 ? 100 : value > 9999 ? 9999 : value;
    if (!Number(value)) {
      this.data.allOrder.map((itemOut, indexOut) => {
        if (indexOut == outIndex) {
          itemOut.tableSource.map(function (item, index) {
            if (index == middIndex) {
              item[1].map(function (it, i) {
                i == innerIndex ? it[attributeCode] = null : ''
              })
            }
          })
        }
      })
      
    } else {
      this.data.allOrder.map((itemOut, indexOut) => {
        if (indexOut == outIndex) {
          itemOut.tableSource.map(function (item, index) {
            if (index == middIndex) {
              item[1].map(function (it, i) {
                if (i == innerIndex) {
                  if (value != it[attributeCode]) {
                    it.orderQuantity = ''
                    it.baseOrderQuantity = 0
                    it.amount = 0
                  }
                  it[attributeCode] = value
                }
              })
            }
          })
        }
      })
      
    }
    this.countSelected(this.data.allOrder);
  },
  // 点击取消返回
  cancelTap: function(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  //  跳转到补充信息页面
  sopTap: function() {
    var jump = true;
    var selectedRows = this.data.selectedRows.filter((item,index)=>{
      if(item.length >0) return item //过滤掉空数组
    })
    if (selectedRows.length == 1){
      selectedRows.map((item)=>{
        item.map((it)=>{
          if (!Number(it.baseOrderQuantity)) {
            wx.showToast({
              title: '吨数不能为0！',
              icon: 'none',
              duration: 1000
            })
            jump = false
          } else if (!Number(it.amount)) {
            wx.showToast({
              title: '金额不能为0！',
              icon: 'none',
              duration: 1000
            })
            jump = false
          } else {
            this.checkUserFreeze()
          }
        })
      })
      if(jump&&this.data.jump){
        var contactId,contact;
        selectedRows.map(function(item){
          item.map((it)=>{
            for (var i in it) {
              i == "checked" ? delete it[i] : ''
            }
            contactId = it.contactId
          })
        })
        selectedRows = selectedRows[0];//减少数组层级
        this.data.allOrder.map((itemOut,indexOut)=>{
          itemOut.tableSource.map((item,index)=>{
            item[1].map((it,i)=>{
              if (it.checked){
                contact = itemOut.contact;
              }
            })
          })
        })
        // console.log(contact)        
        // console.log(selectedRows)        
        var selectedRows = JSON.stringify(selectedRows);
        contact = JSON.stringify(contact);
        wx.navigateTo({
          url: `/pages/supplement/supplement?selectedRows=${selectedRows}&contactId=${contactId}&contact=${contact}`,
        })
      }
    } else if(selectedRows.length == 0) {
      wx.showToast({
        title: '请选择要提交的行数据！',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.showToast({
        title: '一次只能下一个订单',
        icon: 'none',
        duration: 1000
      })
    }
     
  },
  checkUserFreeze: function() {
    wx.request({
      url: `${authService}/saleOrder/checkUserFreeze?tradePartyId=${this.data.tradePartyId}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': this.data.authorizedCookie
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
        if (json.code != "S") {
          wx.showToast({
            title: json.msg,
            icon: 'none',
            duration: 1000
          })
          this.setData({
            jump:false
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