// pages/take/take.js 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [{
        id: "0",
        name: "侯亮平",
        phone: "15122176897",
        addr: "育昌路369号，山东省潍坊市昌乐县",
        checked: true
      },
      {
        id: "2",
        name: "侯亮平",
        phone: "15122176897",
        addr: "育昌路369号，山东省潍坊市昌乐县"
      },
    ],
    radio_checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.name);
    var arr = [];
    arr = options;
    console.log(arr);
  },

  // 跳转到编辑地址页面
  footerTap: function() {
    wx.navigateTo({
      url: '/pages/compile/compile',
    })
  },

  compileTap: function() {
    wx.navigateTo({
      url: '/pages/compile/compile',
    })
  },

  // 点击删除功能
  delTap: function(e) {
    // console.log(e);
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if (that.data.address.length > 1) {
      var info = [...this.data.address];
      info.splice(index, 1);
      this.setData({
        address: info
      })
    }
  },

  selected: function(e) {
    console.log(e);
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