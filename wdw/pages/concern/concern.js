var app = getApp();
var cmService = app.globalData.cmService;
var authService = app.globalData.authService;
var customer_id = app.globalData.customer_id;
const util = require('../../utils/util.js');
// pages/concern/concern.js
Page({

  /**  
   * 页面的初始数据 
   */
  data: {
    data: [], //数据
    box: true,
    pageSize: 10, //页面数据条数
    current: 1, //起始页
    // index: 0,
    region: ['上海市', '静安区', '万荣路'],
    showHide: false, //取消关注的显示隐藏
    json: [],
     arr: [], //商品大类
     idx: 0,
     area: '',
    company: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let authorizedCookie = encodeURI("__wgt=" + util.getStorageSync('__wgt') + ";" + "__wgl=" + util.getStorageSync('__wgl') + ";" + "menuKey=" + util.getStorageSync('menuKey') + ";" + "userName=" + util.getStorageSync('userName') + ";" + 'userDefaultTradeCompany=' + JSON.stringify(util.getStorageSync('userDefaultTradeCompany')));
    this.setData({
      authorizedCookie: authorizedCookie
    })
    this.getData();
    this.commodityTap();
  },

  // 获取动态数据 
  getData: function(e) {
    var that = this;
    var current = this.data.current;
    var pageSize = this.data.pageSize;
    wx.request({
      url: `${authService}/resourceBill/queryMyFollowResBill?page=${ current }&pageSize=${ pageSize }`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      success: function(res) {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }

        // console.log(res.data);
        var data = res.data.content;
        data = data.map(function(item, i) {
          item = JSON.parse(item);
          item.checked = false;
          return item;
        })
        // console.log(data);
        that.setData({
          data: data,
        })
        // console.log(data);
      }
    })
  }, 

  // 商品大类点击事件
  commodityTap: function(e) {
    var that = this;
    wx.request({
      url: `${authService}/common/lookUpValue?code=MD.ITEM_MIDDLE_CATEGORY`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      success: function(res) {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        console.log(res);
        var info = res.data;
        var arr = [{
          label: "请选择商品大类",
          value:''
        }];
        Object.keys(info).forEach((k, i) => {
          arr.push({ value: k, label: info[k] });
        })
        console.log(arr)
        that.setData({
          arr: arr
        })
      },
    })
  },

  // 点击选中取消按钮
  iconTap: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.data.map((item, i) => {
      if (index == i) {
        item.checked = !item.checked;
      } else {
        item.checked = false;
      }
    })
    this.setData({
      data: this.data.data,
    })

    var showHide = false;
    this.data.data.map((item, i) => {
      if (item.checked == true) {
        showHide = true;
      }
    })
    this.setData({
      showHide: showHide
    })

  },

  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },



  //取消关注点击事件
  footerTap: function(e) {
    var that = this;
    var showHide = this.data.showHide;
    var resourceBillId;
    this.data.data.map((item, i) => {
      if (item.checked) {
        resourceBillId = item.resourceBillId
      }
    })
    wx.request({
      url: `${authService}/resourceBill/submitFollow?resourceBillId=${resourceBillId}`,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': this.data.authorizedCookie
      },
      success: (res) => {
        try {
          util.catchHttpError(res);
        } catch (e) {
          console.error(e)
          return
        }
        var arr = res.data;
        console.log(arr);
        this.getData();
      }
    })
    that.setData({
      showHide: false
    })
  },

//搜索
  searchTap: function(e){
    var that = this;
    var area = that.data.area;
    var company = that.data.company;
    console.log(area);
    console.log(company);
  },
  //区域
input: function(e) {
  console.log(e.detail.value);
  var area = e.detail.value;
  this.setData({
    area: area
  })
  console.log(area);
},
//公司名称
  choiceTap: function(e) {
    // console.log(e.detail.value);
    var company = e.detail.value;
    this.setData({
      company: company
    })
    console.log(company);
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

// var that = this;
// var current = this.data.current;
// var pageSize = this.data.pageSize;
// wx.request({
//   url: `${authService}/resourceBill/queryMyFollowResBill?page=${current}&pageSize=${pageSize}`,
//   data: {},
//   method: 'POST',
//   header: {
//     'content-type': 'application/json',
//     'cookie': this.data.authorizedCookie
//   },
//   success: function (res) {
//     try {
//       util.catchHttpError(res);
//     } catch (e) {
//       console.error(e)
//       return
//     }
//     var info = res.data.content;
//     console.log(info);
//     var newData = [];
//     info.map((item, i) => {
//       newData.push(JSON.parse(item))
//     })
//     console.log(newData);
//   }
// })