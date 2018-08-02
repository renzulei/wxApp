// pages/compile/compile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['上海市，静安区', '山东省，潍坊市，昌乐县369号', '杭州市，西湖区', '苏州市'],
    showHide: true,
    region: ['广东省', '广州市', '海珠区'],
    index: '',
    value: '',
    checked: true
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
    // 所在地函数
  bindRegionChange: function (e) {
    console.log(e);
    var index = e.detail.value;
    var that = this;
    that.setData({
      index: e.detail.value
    })
    console.log(index)
  },

  add: function(event) {
    console.log(111111)
    var that = this;
    that.setData ({
      checked: (!that.data.checked)
    })
  },

  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    console.log(e)
    var value = e.detail.value;
    var that = this;
    that.setData({
      value: e.detail.value
    })
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