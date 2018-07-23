// pages/concern/concern.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    box: true,
    list: [{
        id: "0",
        title: "江苏富星A级单面涂布灰底白板纸灰底涂布纸350g 平张",
        ping_zhang: "平张",
        yin_shua: "印刷纸",
        tu_bu: "灰底涂布纸",
        jia_ge: "￥8670.69"
      },
      {
        id: "1",
        title: "江苏富星A级单面涂布灰底白板纸灰底涂布纸350g 平张",
        ping_zhang: "平张",
        yin_shua: "印刷纸",
        tu_bu: "灰底涂布纸",
        jia_ge: "￥8670.69"
      },
      {
        id: "2",
        title: "江苏富星A级单面涂布灰底白板纸灰底涂布纸350g 平张",
        ping_zhang: "平张",
        yin_shua: "印刷纸",
        tu_bu: "灰底涂布纸",
        jia_ge: "￥8670.69"
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 跳转到产品列表页面
  proListTap: function(event) {
    wx.switchTab({
      url: '/pages/proList/proList',
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