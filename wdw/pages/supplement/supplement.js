// pages/supplement/supplement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
    list:[
      {
        id: "0",
        name: "标准订单",
        intention: "意向订单",
        checked: false
      },
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

 

// 点击小图标商品列表显示和隐藏
  iconTap: function(event) {
      var that = this;
     that.setData({
        showHide: (!that.data.showHide)
     })
  },

  succeedTap: function() {
    wx.navigateTo({
      url: '/pages/affirm/affirm',
    })
  },

  add: function (e) {
    console.log(e)
    var that = this;
    var checked = '';
    that.setData({
      checked: (!that.data.checked)
    })
    console.log(checked)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})