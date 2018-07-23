var app = getApp();
var cmService = app.globalData.cmService;
var customer_id = app.globalData.customer_id
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgc: "/images/bgc.png",
    searchValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 促销商品
    this.dataInof();
    // 供应链
    this.getInof();
  },
  // 搜索框键盘输入值处理函数
  upSeachValue: function(e) {
    var searchValue = e.detail.value;
    this.setData({
      searchValue: searchValue,
    })
  },
  // 搜索
  handleSearch: function() {
    var searchValue = this.data.searchValue;
    app.globalData.searchContent = searchValue;
    wx.switchTab({
      url: '/pages/proList/proList',
    })
  },

  //促销商品数据
  dataInof: function() {
    var that = this;
    wx.request({
      url: `${cmService}/businessExplain/query?region=ZYCP`,
      data: {},
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': '__wgl=' + wx.getStorageSync('__wgl')
      },
      success: function(res) {
        console.log(res)
        var data = res.data;
        console.log(data)
        that.setData({
          // businessAA: data.businessExplain,
          // categoryIdAA: data.categoryId,
          // businessIconUrlAA: `/businessdetails.html?categoryId=${data.categoryId}`,
          // categoryNameAA: data.categoryName,
          // descriptionAA: data.description,
          data:res.data
        })
      },
    })
  },

  // 供应链数据
  getInof: function() {
    var that = this;
    wx.request({
      url: `${cmService}/businessExplain/query?region=GYLJR`,
      data: {},
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'cookie': '__wgl=' + wx.getStorageSync('__wgl')
      },
      success: function(res) {
        var list = res.data;
        console.log(list);
        that.setData({
          // businessExplainBB: list.businessExplain,
          // businessIconUrlBB: list.businessIconUrl,
          // categoryIdBB: list.categoryId,
          // categoryNameBB: list.categoryName,
          // descriptionBB: list.description,
          add:res.data
        })
      },
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