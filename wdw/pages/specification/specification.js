// pages/specification/specification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

   
  },

  // 返回proList产品列表页
  cancelTap: function() {
    console.log(1111111);
    wx.switchTab({
      url: "/pages/proList/proList"
    })
  },

  // 创建订单页面
  shoppingTap: function() {
    wx.navigateTo({
      url: '/pages/createOrder/createOrder',
    })
  },

  copyTap: function(e) {
    console.log(11111111111);
    var num = this.data.num;
    num++
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