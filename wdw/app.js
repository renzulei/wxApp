//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('__wgl', 'zh_CN')
   
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },
  onPageNotFound(res) {
    console.log(res)
  },
  globalData: {
    userInfo: [],
    http_host: 'http://192.168.10.100:8001',
    openid: wx.getStorageSync('openid'),
    is_bind: 0, //用户是否绑定手机号
    user_id: wx.getStorageSync('user_id'),
    rd_session: wx.getStorageSync('rd_session'), //用户登录态session
    /*语言配置*/
    Lang: 'lang=zh_CN',
    /*内容管理*/
    cmService: 'http://192.168.10.100:8001/core/restapi/public',
    /*用户管理*/
    umService: 'http://192.168.10.100:8001/core/restapi/public',
    /*权限管理*/
    authService: 'http://192.168.10.100:8001/core/restapi/private',
  },
})