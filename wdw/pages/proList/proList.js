// pages/proList/proList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: 'true',
    showHides: 'true',
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
    productDetail: { 
      "objectVersionNumber": null, 
      "productId": 3060, 
      "productCode": null, 
      "productName": "高级瓦楞", 
      "enabledFlag": "Y", "sort": 0, 
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
    selectedProductId: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },


  // 筛选的函数
  screenTap: function(event) {
    var that = this;
    that.setData({
      showHides: (!that.data.showHides)
    })
  },

  // 底部弹窗函数
  shoppingTap: function(e) {
    var selectedProductId = e.currentTarget.dataset.productid;
    var that = this;

    that.setData({
      showHide: !that.data.showHide,
      selectedProductId: selectedProductId
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

  btnTap: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/specification/specification',
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