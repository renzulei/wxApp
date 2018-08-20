// pages/supplement/supplement.js
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
    checked: true,
    allA: 0, //总金额
    allT: 0, //总吨数
    selectedRows: [], //待提交的表格数据
    saleOrderTypeListChoose: 'STD' //默认选择的是标准订单（STD）
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
    var partyName = userDefaultTradeCompany ? userDefaultTradeCompany.partyName || "": "";
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId || "": "";
    var currencyCode = userDefaultTradeCompany ? userDefaultTradeCompany.currencyCode || "": "";
    var contactId = options.contactId;
    var contact = JSON.parse(options.contact);
    var selectedRows = JSON.parse(options.selectedRows);
    var address = contact.address;
    var contactPerson = contact.defaultContactPerson || contact.personName
    this.setData({
      partyName: partyName,
      address: address,
      tradePartyId: tradePartyId,
      currencyCode: currencyCode,
      contactId: contactId,
      contact: contact,
      contactPerson: contactPerson
    })   
    this.grouping(selectedRows, contactId, authorizedCookie, tradePartyId);
  },
  /*获取购物车条件*/
  getCartCondition: function(contactId, authorizedCookie, tradePartyId) {
    wx.request({
      url: `${authService}/saleOrder/saleOrderCondition?contactId=${contactId}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': authorizedCookie
      },
      data: JSON.stringify({
        tradePartyId: tradePartyId
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
        if (json.code == "S") {
          this.setData({
            payPointList: json.payPointList,
            payMethodList: json.payMethodList,
            saleOrderTypeList: json.saleOrderTypeList,
            shipMethodList: json.shipMethodList,
            shipRequireList: json.shipRequireList,
            contactInfo: json.contactInfo,
            unloadTimeRequirement: json.contactInfo ? json.contactInfo.uploadStr : "",
            specialShipment: json.contactInfo ? json.contactInfo.specialShipment : "",
            shipRequireCode: json.contactInfo ? json.contactInfo.shipRequireCode : "",
            shipRequireMeaning: json.contactInfo ? json.contactInfo.shipRequireMeaning : "",
            storeId: json.contactInfo ? json.contactInfo.storeId : "",
            priceControlFlag: json.contactInfo ? json.customerInfo.priceControlFlag : "",
            factorList: json.customerInfo ? json.customerInfo.factorList : '',
          })
          json.customerInfo.factorList.map((item) => {
            if (item.factorCode == "CREDIT") {
              this.setData({
                factorCodeCREDIT: item.factorCodeValue
              })
            } else {
              this.setData({
                factorCodeIOUS: item.factorCodeValue
              })
            }
          })
          json.payPointList.map((item) => {
            if (item.defaultFlag == "Y") {
              this.setData({
                payPointListChoose: item.value,
                payPointListChooseName: item.meaning,
                payPointListChooseTag: item.tag,
              }, this.initPayPointListArr)
            }
          })
          json.payMethodList.map((item) => {
            if (item.defaultFlag == "Y") {
              this.setData({
                payMethodListChoose: item.value,
                payMethodListChooseName: item.meaning,
              }, () => {
                this.initPayMethodListArr();
                if (this.data.priceControlFlag != "Y") {
                  if (this.data.payPointListChooseTag == "CREDIT" && this.data.payMethodListChoose == "IOUS") {
                    this.setData({
                      payMethodListChoose: "",
                      payMethodListChooseName: "",
                    })
                  }
                }
              })
            }
          })
          json.shipMethodList.map((item) => {
            if (item.defaultFlag == "Y") {
              this.setData({
                shipMethodListChoose: item.value,
                shipMethodListChooseName: item.meaning,
              }, this.getItemSalePrice(this.data.payPointListChoose, this.data.payMethodListChoose, this.data.shipMethodListChoose))
            }
          })
        } else {
          wx.showToast({
            title: json.msg,
            icon: 'none',
            duration: 1000
          })

        }
      }
    })
  },

  grouping: function (arr, contactId, authorizedCookie, tradePartyId) {
    // 以下代码对数据按商品名称分组
    let obj = {},
      tableSource = [],
      folders = [];
    arr.map((item) => {
      item.itemChangableAttributes.map((it) => {
        if (it["attributeName"] == '幅宽mm') {
          this.setData({
            code: it["attributeCode"]
          })
        } else {
          this.setData({
            cutLength: it["attributeCode"]
          })
        }
      })
      if (obj.hasOwnProperty(item.itemName)) {
        obj[item.itemName].push(item)
      } else {
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
      }, obj[key]])
    })
    // console.log(tableSource)
    this.countSelected(tableSource)
    this.setData({
      tableSource: tableSource,
      folders: folders
    }, this.getCartCondition(contactId, authorizedCookie, tradePartyId))
  },
  // 计算被选中的商品
  countSelected: function(tableSource) {
    var selectedRows = [];
    var allA = 0,
      allT = 0;
    tableSource.map(function(item, index) {
      item[1].map(function(it, i) {
        selectedRows.push(it);
      })
    })
    selectedRows.map(function(it, i) {
      allA += Number(it.amount);
      allT += Number(it.baseOrderQuantity);
    })
    allT = allT.toFixed(3) //吨数保留三位小数
    this.setData({
      selectedRows: selectedRows,
      allA: allA,
      allT: allT
    })
  },
  // 订单类型改变触发
  saleOrderTypeListChange: function(e) {
    this.setData({
      startDataString: "",
      endDataString: ""
    })
    this.data.payPointList.map((item) => {
      if (item.defaultFlag == "Y") {
        this.setData({
          payPointListChoose: item.value,
          payPointListChooseName: item.meaning,
          payPointListChooseTag: item.tag,
        })
      }
    })
    this.data.payMethodList.map((item) => {
      if (item.defaultFlag == "Y") {
        this.setData({
          payMethodListChoose: item.value,
          payMethodListChooseName: item.meaning,
        }, () => {
          if (this.data.priceControlFlag != "Y") {
            if (this.data.payPointListChooseTag == "CREDIT" && this.data.payMethodListChoose == "IOUS") {
              this.setData({
                payMethodListChoose: "",
                payMethodListChooseName: "",
              })
            }
          }
        })
      }
    })
    this.data.shipMethodList.map((item) => {
      if (item.defaultFlag == "Y") {
        this.setData({
          shipMethodListChoose: item.value,
          shipMethodListChooseName: item.meaning,
        })
      }
    })
    let arr = []
    arr = e.detail.value.split(":");
    // console.log(arr)
    this.setData({
      saleOrderTypeListChoose: arr[0],
      saleOrderTypeListChooseName: arr[1]
    }, this.initPayPointListArr)
  },
  // 计算可展示的支付节点
  initPayPointListArr: function() {
    let arrList = [];
    if (this.data.saleOrderTypeListChoose != "INTE") {
      if (this.data.priceControlFlag == "Y") {
        if (this.data.payPointList)
          this.data.payPointList.map((item) => {
            if (item.value == "YXYF") {
              arrList.push(item)
            } else if (item.defaultFlag == "Y") {
              arrList.push(item)
            }
          })
      } else {
        if (this.data.payPointList)
          this.data.payPointList.map((item) => {
            if (item.value != "YXYF") {
              arrList.push(item)
            }
          })
      }
    } else {
      if (this.data.priceControlFlag == "Y") {
        if (this.data.payPointList)
          this.data.payPointList.map((item) => {
            if (item.value == "YXYF") {
              arrList.push(item)
            } else if (item.defaultFlag == "Y") {
              arrList.push(item)
            }
          })
      } else {
        if (this.data.payPointList)
          this.data.payPointList.map((item) => {
            arrList.push(item)
          })
      }
    }
    this.setData({
      PayPointListArr: arrList
    })
  },

  // 支付节点改变触发
  payPointListChange: function(e) {
    let arr = []
    arr = e.detail.value.split(":");
    // console.log(arr)
    this.data.payMethodList.map((item) => {
      if (item.defaultFlag == "Y") {
        this.setData({
          payMethodListChoose: item.value,
          payMethodListChooseName: item.meaning,
        }, () => {
          if (this.data.priceControlFlag != "Y") {
            if (this.data.payPointListChooseTag == "CREDIT" && this.data.payMethodListChoose == "IOUS") {
              this.setData({
                payMethodListChoose: "",
                payMethodListChooseName: "",
              })
            }
          }
        })
      }
      if (arr[0] == "ZDHK") {
        this.setData({
          payMethodListChoose: "CREDIT"
        })
      }
    })
    this.data.shipMethodList.map((item) => {
      if (item.defaultFlag == "Y") {
        this.setData({
          shipMethodListChoose: item.value,
          shipMethodListChooseName: item.meaning,
        })
      }
    })
    this.setData({
      payPointListChoose: arr[0],
      payPointListChooseTag: arr[1],
      payPointListChooseName: arr[2],
    }, this.initPayMethodListArr);
    this.getItemSalePrice(arr[0], this.data.payMethodListChoose, this.data.shipMethodListChoose)
  },
  // 价格查询
  getItemSalePrice: function(payPointCode, payMethodCode, recMethodCode) {
    if (util.getStorageSync('userName')) {
      //获取价格
      this.data.tableSource.map((item, index) => {
        item[1].map((it, i) => {
          wx.request({
            url: `${authService}/price/getItemSalePrice`,
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              'cookie': this.data.authorizedCookie
            },
            data: JSON.stringify({
              itemId: it.itemId,
              payPointCode: payPointCode,
              payMethodCode: payMethodCode,
              currencyCode: this.data.currencyCode,
              contactId: this.data.contactId,
              storeId: this.data.storeId,
              recMethodCode: this.data.shipMethodListChoose,
              tradePartyId: this.data.tradePartyId,
            }),
            success: (res) => {
              // console.log(it.itemName,res.data)
              try {
                util.catchHttpError(res);
              } catch (e) {
                console.error(e)
                return
              }
              var json = res.data;
              if (json.code == "S") {
                it.unitPrice = json.msg || "";
                it.orderPrice = json.msg || "";
                it.amount = (it.unitPrice * it.baseOrderQuantity).toFixed(2) || "";
              } else {
                wx.showToast({
                  title: json.msg,
                  icon: "none",
                  duration: 1000
                })
              }
              if (index == this.data.tableSource.length - 1) {
                if (i == item[1].length - 1) { //最后一个循环
                  this.countSelected(this.data.tableSource)
                  this.setData({
                    tableSource: this.data.tableSource
                  })
                }
              }
            }
          })
        })
      })

    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },
  // 计算可展示的支付方式
  initPayMethodListArr: function() {
    let payPoint = [];
    if (this.data.payPointListChooseTag == "REPAYMENT") {
      this.data.payMethodList.map((item, i) => {
        if (item.value == 'CREDIT') {
          payPoint.push(item);
        }
      })

    } else {
      this.data.payMethodList.map((item, i) => {
        if (item.value != 'CREDIT') {
          payPoint.push(item)
        }
      })
      if (this.data.payPointListChooseTag == "CREDIT") {
        payPoint.map((item, i) => {
          if (item.value == 'IOUS') {
            payPoint.splice(i, 1)
          }
        })
      }
    }

    if (this.data.priceControlFlag == "Y") {
      payPoint = payPoint.filter((item, i) => {
        return item.defaultFlag == "Y"
      })
    }
    this.setData({
      payMethodListArr: payPoint
    })
  },
  // 支付方式改变触发
  payMethodListChange: function(e) {
    let arr = [];
    arr = e.detail.value.split(":");
    this.setData({
      payMethodListChoose: arr[0],
      payMethodListChooseName: arr[1],
    });
    this.getItemSalePrice(this.data.payPointListChoose, arr[0], this.data.shipMethodListChoose);
  },
  // 删除一个商品
  onChangeDelete: function(e) {
    var outIndex = e.currentTarget.dataset.outindex;
    var innerIndex = e.currentTarget.dataset.index;
    this.data.tableSource.map((item, index) => {
      if (outIndex == index) {
        if (item[1].length == 1) {
          this.data.tableSource.splice(index, 1)
        } else {
          item[1].map((it, i) => {
            if (innerIndex == i) {
              item[1].splice(i, 1)
            }
          })
        }
      }
    })
    this.countSelected(this.data.tableSource)
    this.setData({
      tableSource: this.data.tableSource
    })
  },
  // 送货方式改变触发
  shipMethodListChange: function(e) {
    let arr = [];
    arr = e.detail.value.split(":");
    this.setData({
      shipMethodListChoose: arr[0],
      shipMethodListChooseName: arr[1],
    })
    this.getItemSalePrice(this.data.payPointListChoose, this.data.payMethodListChoose, arr[0]);
  },
  // 结束时间
  onEndChange: function(e) {
    this.setData({
      endDataString: e.detail.value
    })
  },
  // 开始时间/到货时间
  onStartChange: function(e) {
    this.setData({
      startDataString: e.detail.value
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
  /*补充信息页面提交数据*/
  submitData: function() {
    let contactId, tradePartyId
    if (util.getStorageSync('userName')) {
      let data = [],
        canClick = true
      this.data.selectedRows.map((it, j) => {
        contactId = it.contactId
        tradePartyId = it.tradePartyId
        it.specialRequirement = "", //特殊要求
        it.inventItemId = it.inventId
        it.orderPrice = it.unitPrice
        it.itemChangableAttributes.map((its) => {
          its.itemAttrValue = its.value
        })
        it.soItemAttributeList = it.itemChangableAttributes
        if (!Number(it.amount)) {
          canClick = false
        }
      })
      data = [{
        orderTypeCode: this.data.saleOrderTypeListChoose, //订单类型
        payPointCode: this.data.payPointListChoose,//支付节点
        custTradePartyId: tradePartyId, //交易主体
        payMethodCode: this.data.payMethodListChoose, //支付方式
        custContactId: contactId, //客户联系信息id
        recMethodCode: this.data.shipMethodListChoose, //送货方式
        unloadTimeRequirement: this.data.unloadTimeRequirement, //卸货时间要求
        shipRequireCode: this.data.shipRequireCode, //装运要求
        otherShipRequirement: this.data.specialShipment, //其他装运要求
        saleOrderLine: this.data.selectedRows, //表格内容
        deliveryDate: this.data.startDataString, //起始时间
        deliveryDateTo: this.data.endDataString || '', //结束时间
      }]
      if (!this.data.payMethodListChoose) {
        wx.showToast({
          title: '支付方式不能为空！',
          icon: 'none',
          duration: 1000
        })
        return
      }
      if (!this.data.startDataString) {
        wx.showToast({
          title: '到货时间未填写完整',
          icon: 'none',
          duration: 1000
        })
        return
      }
      if (this.data.saleOrderTypeListChoose == "INTE") {
        if (!this.data.endDataString) {
          wx.showToast({
            title: '到货时间未填写完整',
            icon: 'none',
            duration: 1000
          })
          return
        }
      }
      if (canClick) {
        wx.request({
          url: `${authService}/saleOrder/submitShopCartToOrderCache?tradePartyId=${this.data.tradePartyId}`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'cookie': this.data.authorizedCookie
          },
          data: JSON.stringify(data),
          success:(res)=>{
            try {
              util.catchHttpError(res);
            } catch (e) {
              console.error(e)
              return
            }
            var json = res.data;
            if (json.code == "S") {
              var prevData = this.prevData();
              wx.navigateTo({
                url: `/pages/affirm/affirm?prevData=${prevData}`,//跳转下一页，this.data携带本页面全部数据
              })
            } else {
              wx.showToast({
                title: json.msg,
                icon: 'none',
                duration: 1000
              })
              
            }
          }
        })
        
      } else {
        wx.showToast({
          title: '金额不能为空',
          icon: 'none',
          duration: 1000
        })
      }

    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },
  // 传递到下个页面的数据
  prevData:function(){
    var prevData = {};
    prevData.contactPerson=this.data.contactPerson;
    prevData.contact=this.data.contact;
    prevData.saleOrderTypeListChoose=this.data.saleOrderTypeListChoose;
    prevData.payPointListChooseName=this.data.payPointListChooseName;
    prevData.payMethodListChooseName=this.data.payMethodListChooseName;
    prevData.payMethodListChoose=this.data.payMethodListChoose;
    prevData.factorCodeIOUS=this.data.factorCodeIOUS;
    prevData.payMethodListChoose=this.data.payMethodListChoose;
    prevData.factorCodeCREDIT=this.data.factorCodeCREDIT;
    prevData.startDataString=this.data.startDataString;
    prevData.endDataString=this.data.endDataString;
    prevData.tableSource=this.data.tableSource;
    prevData.code=this.data.code;
    prevData.cutLength=this.data.cutLength;
    prevData.selectedRows=this.data.selectedRows;
    prevData.allT=this.data.allT;
    prevData.allA=this.data.allA;
    prevData.shipMethodListChoose=this.data.shipMethodListChoose;
    prevData.folders = this.data.folders;
    
    return JSON.stringify(prevData)
  },
  // 点击取消返回
  returnFor: function(e) {
    wx.navigateBack({
      delta: 1
    });
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