// pages/compile/compile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showHide: true,
    region: ["1", "2", "3", "4", "5"],
    data: '',
    value: '',
    checked: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 所在地函数
  bindRegionChange: function(e) {
    var that = this;
    console.log(e);
    var that = this;
    var data = this.data.data;
    data = e.detail.value;
    that.setData({
      data: data
    })
  },

  add: function(event) {
    var that = this;
    that.setData({
      checked: (!that.data.checked)
    })
  },

  bindPickerChange: function(e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      value: e.detail.value,
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