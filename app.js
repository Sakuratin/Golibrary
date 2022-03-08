// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  loadingShow() {
    console.log(this.globalData.loadingHidden)
    this.globalData.loadingHidden = false
  },
  loadingHide() {
    console.log(this.globalData.loadingHidden)
     this.globalData.loadingHidden = true
  },
  globalData: {
    userInfo: null,
    baseURL: "https://golibrary.loidair.com",
    // baseURL: "http://localhost:8080",
    loadingHidden: true
  }
})
