// pages/proList/proList.js
var app = getApp()
var cmService = app.globalData.cmService
var customer_id = app.globalData.customer_id
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */ 
  data: { 
    showHide: 'true',
    showHides: 'true',
    // 产品列表数据
    shop: [{
      "productId": "3060",
      "productName": "高级瓦楞",
      "physicalStateName": "卷筒",
      "supperCategoryName": "瓦楞纸",
      "itemCategoryName": "高强瓦楞纸",
      "unitPrice": "4000.0",
      "sort": "0",
      "key": 0
    }, {
      "productId": "2793",
      "productName": "测试物料-原纸成品3",
      "physicalStateName": "平张",
      "supperCategoryName": "白板纸",
      "itemCategoryName": "白面牛卡纸",
      "unitPrice": "780.0",
      "sort": "1",
      "key": 1
    }, {
      "productId": "3024",
      "productName": "123",
      "physicalStateName": "平张",
      "supperCategoryName": "白板纸",
      "itemCategoryName": "白面牛卡纸",
      "unitPrice": "10000.0",
      "sort": "0",
      "key": 2
    }],
    // 筛选条件数据
    filters: [{
      "name": "商品大类",
      "item": [{
        "name": "纱管纸",
        "value": "SGZ"
      }, {
        "name": "进口纸",
        "value": "JKZ"
      }, {
        "name": "白板纸",
        "value": "BBZ"
      }, {
        "name": "箱板纸",
        "value": "XBZ"
      }, {
        "name": "瓦楞纸",
        "value": "WLZ"
      }]
    }, {
      "name": "存在状态",
      "item": [{
        "name": "平张",
        "value": "PZ"
      }, {
        "name": "卷筒",
        "value": "JT"
      }]
    }, {
      "name": "克重",
      "item": [{
        "name": "100g及以下",
        "value": "100g及以下"
      }, {
        "name": "110g",
        "value": "110g"
      }, {
        "name": "120g",
        "value": "120g"
      }, {
        "name": "130g",
        "value": "130g"
      }, {
        "name": "140g",
        "value": "140g"
      }, {
        "name": "150g",
        "value": "150g"
      }, {
        "name": "160g",
        "value": "160g"
      }, {
        "name": "170g",
        "value": "170g"
      }, {
        "name": "180g",
        "value": "180g"
      }, {
        "name": "190g",
        "value": "190g"
      }, {
        "name": "200g及以上",
        "value": "200g及以上"
      }]
    }, {
      "name": "商品中类",
      "item": [{
        "name": "纱管纸",
        "value": "SGZ"
      }, {
        "name": "进口瓦楞纸",
        "value": "JKWL"
      }, {
        "name": "进口牛卡纸",
        "value": "JKNK"
      }, {
        "name": "白面牛卡纸",
        "value": "BDNKZ"
      }, {
        "name": "灰底涂布纸",
        "value": "HDTBZ"
      }, {
        "name": "牛底涂布纸",
        "value": "NDTBZ"
      }, {
        "name": "再生箱板纸",
        "value": "ZS"
      }, {
        "name": "牛卡箱板纸",
        "value": "NK"
      }, {
        "name": "普通瓦楞纸",
        "value": "PW"
      }, {
        "name": "高级瓦楞纸",
        "value": "GW"
      }]
    }],
    // 产品详情数据
    productDetail: {
      "objectVersionNumber": null,
      "productId": 3060,
      "productCode": null,
      "productName": "高级瓦楞",
      "enabledFlag": "Y",
      "sort": 0,
      "productDetail": "<p><br></p>",
      "productCycle": "<p><br></p>",
      "unitPrice": null,
      "physicalStateName": null,
      "itemCategoryName": null,
      "supperCategoryName": null,
      "defaultItemId": 93,
      "itemAttributes": null,
      "productPic": null,
      "lang": null,
      "contactId": null,
      "favoritesFlag": "N",
      "productItemList": null,
      "productAttachList": null
    },
    // 物料种类数据
    productItems: [{
      "objectVersionNumber": null,
      "itemId": 93,
      "itemCategoryId": 102,
      "itemCode": "BW1902000",
      "itemName": "高级瓦楞",
      "itemAlias": null,
      "description": "",
      "uomCode": "TON",
      "customsCode": null,
      "physicalStateCode": "JT",
      "publicFlag": "Y",
      "enabledFlag": null,
      "startDateActive": null,
      "endDateActive": null,
      "sourceKey": null,
      "inventId": null,
      "categoryCode": null,
      "itemCategoryIds": null,
      "categoryName": "高强瓦楞纸",
      "physicalStateName": "卷筒",
      "supperCategoryCode": "WLZ",
      "supperCategoryName": "瓦楞纸",
      "itemAttributeId": null,
      "fixedAttributeId": null,
      "attributeCode": null,
      "brandCodes": null,
      "qtyCodes": null,
      "attributeValue": null,
      "unitPrice": 4000,
      "quantity": null,
      "tonnage": null,
      "currencyCode": null,
      "baseOrderQuantity": null,
      "orderQuantity": null,
      "orderUom": null,
      "baseOrderUom": null,
      "amount": null,
      "priceCodes": null,
      "shelveStatusCode": null,
      "searchBoxContext": null,
      "priceSort": null,
      "saleCountSort": null,
      "itemChangableAttributes": null,
      "itemFixedAttributes": null,
      "itemApvSuppliers": null,
      "itemApvCustomers": null,
      "attributeName": null
    }],
    selectedProductId: '',
    userDefaultTradeCompany: '',
    partyName: '', //交易主体（从缓存读取）
    address: "", //收货地址（从缓存读取）
    tradePartyId: '',
    contactId: "",
    items: '', //选中物料的数据
    color_choose: '', //选中的物料
    itemName: '', //选中物料作为参数带到填写规格页面
    unitPrice: '', //选中物料价格
    physicalStateCode: '', //选中物料的存在状态
    searchContent: '', //通过搜索进入产品列表的关键词
    searchValue: '', //本页面搜索框输入值
    data: {}, //请求接口时携带数据
    exist: [], //已经被选中的筛选项
    saleCountSortName: '', //销量排序(ASC表示升序，DESC表示降序)
    priceSortName: '', //价格排序（ASC表示升序，DESC表示降序）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userDefaultTradeCompany = wx.getStorageSync('userDefaultTradeCompany');
    var partyName = userDefaultTradeCompany ? userDefaultTradeCompany.partyName : "";
    var address = userDefaultTradeCompany ? userDefaultTradeCompany.address : "";
    var tradePartyId = userDefaultTradeCompany ? userDefaultTradeCompany.tradePartyId : "";
    var contactId = userDefaultTradeCompany ? userDefaultTradeCompany.contactId : "";
    this.setData({
      partyName: partyName,
      address: address,
      tradePartyId: tradePartyId,
      contactId: contactId
    })
     //this.searchContentList() //进入页面加载筛选数据
    // this.searchBoxCont() //进入页面加载列表数据
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var searchContent = app.globalData.searchContent || '';
    console.log(searchContent)
    this.setData({
      searchContent: searchContent
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  searchBoxCont: function() {
    var data = this.data.data
    data.saleCountSort = this.data.saleCountSortName
    data.priceSort = this.data.priceSortName
    //获取商品数据
    if (this.data.searchContent) {
      data.searchBoxContext = this.data.searchContent;  
    }
    this.fetch({
      pageSize: 10,
      current: 1,
      data: data
    })
    this.setData({
      data: data
    })
  },
  searchContentList: function() {
    wx.request({
      url: `${cmService}/product/getProductCondition`,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        var json = res.data;
        var filters = []
        json.conditionList.map((item, i) => {
          if (item.meaning == "physicalStates") {
            filters.push({
              name: item.description,
              item: json.physicalStates.map((item, i) => {
                return ({
                  name: item.meaning,
                  value: item.value,
                })
              }),
            })
          } else if (item.meaning == "supperCategorys") {
            filters.push({
              name: item.description,
              item: json.supperCategorys.map((item, i) => {
                return ({
                  name: item.meaning,
                  value: item.value,
                })
              }),
            })
          } else if (item.meaning == "midCategorys") {
            filters.push({
              name: item.description,
              item: json.midCategorys.map((item, i) => {
                return ({
                  name: item.meaning,
                  value: item.value,
                })
              }),
            })
          } else if (item.meaning == "itemBrands") {
            filters.push({
              name: item.description,
              item: json.itemBrands.map((item, i) => {
                return ({
                  name: item.meaning,
                  value: item.value,
                })
              }),
            })
          } else if (item.meaning == "itemWeights") {
            filters.push({
              name: item.description,
              item: json.itemWeights.map((item, i) => {
                return ({
                  name: item.meaning,
                  value: item.value,
                })
              }),
            })
          } else if (item.meaning == "itemPrices") {
            filters.push({
              name: item.description,
              item: json.itemPrices.map((item, i) => {
                return ({
                  name: item.meaning,
                  value: item.value,
                })
              }),
            })
          }
        })
        this.setData({
          filters: filters
        })
      }
    })
  },
  // 物料选择
  typeChoose: function(e) {
    // console.log(e)
    var data = e.currentTarget.dataset.item;
    this.setData({
      items: data,
      color_choose: data.itemName,
      itemName: data.itemName,
      physicalStateCode: data.physicalStateCode,
      unitPrice: data.unitPrice,
    })
  },
  // 搜索框键盘输入值处理函数
  upSeachValue: function(e) {
    var searchValue = e.detail.value;
    this.setData({
      searchValue: searchValue,
    })
  },
  // 展示筛选框的函数
  screenTap: function(event) {
    var that = this;
    that.setData({
      showHides: (!that.data.showHides)
    })
  },
  // 搜索
  handleSearch: function() {
    var searchValue = this.data.searchValue;
    app.globalData.searchContent = searchValue;
    this.setData({
      searchContent: searchValue,
    }, this.fetchChoose(this.data.exist))
  },
  goSpecification: function() {
    var physicalStateCode = this.data.physicalStateCode;
    var items = this.data.items;
    wx.navigateTo({
      url: `/pages/specification/specification?physicalStateCode=${physicalStateCode}&items=${items}`,
    })
  },
  // 筛选条件放入data参数中
  fetchChoose: function(newExist) {
    var items = JSON.stringify(newExist);
    var data = {}
    // console.log(items)
    JSON.parse(items).map((item, i) => {
      var value = []
      var name = []
      item.items.map((it, i) => {
        value.push(it.value)
        name.push(it.name)
        item.title == "存在状态" ? data.physicalStateCode = value.join(",") :
          item.title == "商品大类" ? data.supperCategoryCode = value.join(",") :
          item.title == "商品中类" ? data.itemCategoryIds = value.join(",") :
          item.title == "品牌" ? data.brandCodes = value.join(",") :
          item.title == "克重" ? data.qtyCodes = value.join(",") :
          item.title == "价格" ? data.priceCodes = value.join(",") :
          data.searchBoxContext = this.data.searchContent
      })

    })
    if (this.data.searchContent) {
      data.searchBoxContext = this.data.searchContent;
    }
    data.saleCountSort = this.data.saleCountSortName
    data.priceSort = this.data.priceSortName
    this.setData({
      data: data
    })
    this.fetch({
      pageSize: 10,
      current: 1,
      data: data
    });
  },

  // 根据筛选条件请求商品列表数据
  fetch: function(params = {}) {
    console.log(params.data)
    var tradePartyId = this.data.tradePartyId;
    var contactId = this.data.contactId;
    wx.request({
      url: `${cmService}/product/getProductByCondition?page=${params.current}&pageSize=${params.pageSize}&tradePartyId=${tradePartyId}&contactId=${contactId}`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      body: JSON.stringify(params.data),
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  // 点击筛选项处理函数
  handleSingleClick: function(e) {
    var title = e.currentTarget.dataset.title
    var value = e.currentTarget.dataset.item.value
    var name = e.currentTarget.dataset.item.name
    var handlePush = true;
    var newExist = this.data.exist;
    newExist.map((item, i) => {
      if (item.title == title) {
        this.data.exist.splice(i, 1);
        item.items.map(itemsName => {
          if (itemsName.name != name) {
            handlePush = true;
          } else {
            handlePush = false;
          }
        })
      }
    });
    if (handlePush) {
      newExist = this.data.exist;
      newExist.push({
        title: title,
        items: [{
          name,
          value
        }]
      });
    };
    this.setData({
      exist: newExist
    });
    this.filterSelected(newExist);
    // console.log(newExist)
    this.fetchChoose(newExist);
  },

  // filters选中筛选项加selected为true
  filterSelected: function(newExist) {
    this.data.filters.map((it, i) => {
      it.item.map((ite, i) => {
        ite.selected = false //默认所有筛选项未选中
      })
    });
    newExist.map((item, i) => {
      this.data.filters.map((it, i) => {
        if (it.name == item.title) {
          it.item.map((ite, i) => {
            ite.selected = (ite.name == item.items[0].name) //被选中的筛选项selected设为true
          })
        }
      })
    })
    this.setData({
      filters: this.data.filters
    })
  },
  // 重置筛选项selected为false,exist为空
  resetFilters: function() {
    this.data.filters.map((it, i) => {
      it.item.map((ite, i) => {
        ite.selected = false //默认所有筛选项未选中
      })
    })
    this.setData({
      filters: this.data.filters,
      exist: [],
      data: {}
    })
    this.fetchChoose([]);
  },
  // 根据销量排序
  sortSales: function() {
    var priceSortName = "";
    var saleCountSortName = this.data.saleCountSortName == "ASC" ? "DESC" : this.data.saleCountSortName == "DESC" ? "ASC" : "ASC";
    this.data.data ? this.data.data.priceSort ? this.data.data.priceSort = "" : "" : "";
    let arr = util.deepCopy(this.data.data, {});
    arr.saleCountSort = saleCountSortName;
    arr.searchBoxContext = this.data.searchContent;
    this.setData({
      priceSortName: priceSortName,
      saleCountSortName: saleCountSortName,
      data: arr
    })
    this.fetch({
      pageSize: 10,
      current: 1,
      data: arr
    })
  },
  // 根据价格排序
  sortPrice: function() {
    var saleCountSortName = "";
    var priceSortName = this.data.priceSortName == "ASC" ? "DESC" : this.data.priceSortName == "DESC" ? "ASC" : "ASC";
    this.data.data ? this.data.data.saleCountSort ? this.data.data.saleCountSort = "" : "" : "";
    let arr = util.deepCopy(this.data.data, {});
    arr.priceSort = priceSortName;
    arr.searchBoxContext = this.data.searchContent;
    this.setData({
      priceSortName: priceSortName,
      saleCountSortName: saleCountSortName,
      data: arr
    })
    this.fetch({
      pageSize: 10,
      current: 1,
      data: arr
    })
  },
  // 底部弹窗函数,同时请求该商品详情数据
  shoppingTap: function(e) {
    var selectedProductId = e.currentTarget.dataset.productid;
    console.log(selectedProductId)
    this.setData({
      showHide: !this.data.showHide,
      selectedProductId: selectedProductId
    })
    var tradePartyId = this.data.tradePartyId;
    var contactId = this.data.contactId;
    wx.request({
      url: `${cmService}/product/getProductDetail?tradePartyId=${tradePartyId}`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      body: JSON.stringify({
        productId: selectedProductId,
        contactId: contactId,
        tradePartyId: tradePartyId
      }),
      success: function(res) {
        console.log(res.data)
        var json = res.data;
        if (json.code == "S") {
          this.setData({
            productDetail: json.productDetail,
            unitPrice: json.productDetail.unitPrice,
            // itemAttributes: json.productDetail.itemAttributes, //商品详情的规格参数，小程序不需要
            productItems: json.items,
            // productDetails: json //商品详情全部数据，不需要
          })
        }
      }
    })
  },
  // 添加关注
  addFocus: function() {
    var selectedProductId = this.data.selectedProductId;
    var tradePartyId = this.data.tradePartyId;
    wx.request({
      url: `${cmService}/product/addItemFavorites?tradePartyId=${tradePartyId}&productId=${selectedProductId}`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.showToast({
          title: '添加关注成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail: function() {
        wx.showToast({
          title: '添加关注失败',
          image: '/images/failicon.png',
          duration: 1000
        })
      }
    })
  },
  // 点击模态框让下面弹窗消失函数
  motaiTap: function(event) {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })
  },

  // 点击模态框让右边的弹窗消失函数
  motaiTaps: function(event) {
    var that = this;
    that.setData({
      showHides: (!that.data.showHides)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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