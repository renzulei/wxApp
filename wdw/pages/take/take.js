// pages/take/take.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[
      {
        id:"0",
        name:"侯亮平",
        phone:"15122176897",
        addr:"育昌路369号，山东省潍坊市昌乐县",
        checked:true
      },
      {
        id: "2",
        name: "侯亮平",
        phone: "15122176897",
        addr: "育昌路369号，山东省潍坊市昌乐县"
      },
      {
        id: "3",
        name: "侯亮平",
        phone: "15122176897",
        addr: "育昌路369号，山东省潍坊市昌乐县"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  footerTap: function() {
    console.log(1111)
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