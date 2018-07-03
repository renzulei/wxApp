// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
    animationData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    showHide: (options.showHide == "true" ? true : false)
  },
  onClick: function() {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })

    // 箭头动画
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    this.animation = animation
    animation.rotate(90).step();
    this.setData({
      animationData: animation.export()
    })


  },

  userTap: function() {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },

  enterpriseTap: function() {
    wx.navigateTo({
      url: '/pages/enterprise/enterprise',
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