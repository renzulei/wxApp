// pages/loging/logion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    validate: false,//登录名和密码为空检查
    username: '',
    password: '',
    wrong:false,//登录名或密码错误
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var username = wx.getStorageSync('login-username') || '';
    var password = wx.getStorageSync('login-password') || '';
    this.setData({
      username: username,
      password: password
    }, this.checkValidate);
    if (username != '' && password!=''){
      // this.login();
    }
  },
  
  setName: function(e) {
    var username = e.detail.value;
    this.setData({
      username
    }, this.checkValidate);
    wx.setStorageSync('login-username', username)
    
  },

  setPass: function(e) {
    var password = e.detail.value;
    this.setData({
      password
    }, this.checkValidate);
    wx.setStorageSync('login-password', password)
    
  },

  checkValidate: function() {
    var bull = false;
    if (this.data.username != '' && this.data.password != '') {
      bull = true;
    }
    this.setData({
      validate: bull
    })
  },

  login:function(){
    var username = this.data.username;
    var password = this.data.password;
    console.log("登录成功")
    wx.switchTab({
      url: '../index/index',
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