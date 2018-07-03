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
    
  },
  onClick: function() {
    var that = this;
    that.setData({
      showHide: (!that.data.showHide)
    })
<<<<<<< HEAD

  },

  // 跳转到收货地址页面
  takeTap: function() {
      wx.navigateTo({
        url: '/pages/take/take',
      })
  },

  // 跳转到关注页面
  attentionTap: function () {
    wx.navigateTo({
      url: '/pages/attention/attention'
    })
=======
>>>>>>> 16dee02791d4a20143b982297fbeb5baf0f0a14c
  },

//  跳转到个人信息页面
  userTap: function() {
    wx.navigateTo({
      url: '/pages/user/user'
    })
  },
  // 跳转到企业认证页面
  enterpriseTapOne: function() {
  wx.navigateTo({
    url: '/pages/enterpriseOne/enterpriseOne',
  })
  },
// 跳转到企业地址认证页面
  enterpriseTapTow: function() {
    wx.navigateTo({
      url: '/pages/enterpriseTow/enterpriseTow',
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