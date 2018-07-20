// pages/supplement/supplement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
    list: [{
        name: "1",
        value: "标准订单",
        checkde: true
      },
      {
        name: "2",
        value: "意向订单",
      },
      {
        name: "3",
        value: "下单预付",
      },
      {
        name: "4",
        value: "发货前预付",
      },
      {
        name: "5",
        value: "赊销",
      },
      {
        name: "6",
        value: "30",
      },
      {
        name: "7",
        value: "60",
      },
      {
        name: "8",
        value: "120",
      },
      {
        name: "9",
        value: "现金支付",
      },
      {
        name: "10",
        value: "白条支付",
      },
      {
        name: "11",
        value: "票据支付",
      }
    ],
    checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 点击小图标商品列表显示和隐藏
  iconTap: function(event) {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })
  },

// 点击跳转到确认信息页面
  succeedTap: function(e) {
    wx.navigateTo({
      url: '/pages/affirm/affirm',
    })
  },
// 点击取消返回
  returnFor: function(e) {
    wx.navigateBack({
      delta:1
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