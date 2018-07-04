// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  // 企业管理的点击事件
  onClick: function() {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })
  },

  takeTap: function() {
    wx.navigateTo({
      url: '/pages/take/take',
    })
  },

  // 跳转到用户页面
  userTap: function() {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },

  // 跳转到我的关注页面
  concernTap: function() {
    wx.navigateTo({
      url: '/pages/concern/concern',
    })
  },

// 跳转到企业认证页面
  enterpriseTap: function() {
    wx.navigateTo({
      url: '/pages/enterprise/enterprise',
    })
  },
  // 跳转到企业地址认证页面
  enterprisesTap: function() {
      wx.navigateTo({
        url: '/pages/enterprises/enterprises',
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