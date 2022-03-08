// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userinfo: {}
  },
  // 事件处理函数
  onShow() {
    wx.getStorage({
      key: "token",
      success: token => {
        if(token.data) {
          console.log("ONSHOW", token.data)
        }
      },
      fail: res => {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  onLoad() {
    console.log("ONLOAD")
    wx.getStorage({
      key: "token",
      success: token => {
        console.log("getToken", token.data)
        wx.request({
          url: app.globalData.baseURL + "/users/user?token=" + token.data + "&t=" + (new Date()).getTime(),
          enableCache: false,
          success: res => {
            if(res.data.code == 1000) {
              this.setData({
                userinfo: res.data.data[0]
              })
            }else {
              console.log("faild", res)
              wx.showToast({
                title: res.data.msg,
                icon: "error",
                success: toast => {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                  }, 1500)
                }
              })
            }
          }
        })
      },
      fail: res => {
        console.log("FAILD", res)
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    })
  },
  toCollect() {
    wx.navigateTo({
      url: '/pages/collects/collects',
    })
  },
  toDownload() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  toAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  toExit() {
    wx.showToast({
      title: '退出成功',
      success: res => {
        setTimeout(() => {
          wx.removeStorage({
            key: 'token',
            success: remove => {
                wx.switchTab({
                  url: '/pages/search/search',
                })
            }
          })
        }, 1500)
      }
    })
  },
  toSetting(e) {
    let email = e.currentTarget.dataset.email
    let avatar = e.currentTarget.dataset.imageurl
    let nickname = e.currentTarget.dataset.nickname

    wx.navigateTo({
      url: '/pages/info/info?email=' + email + "&avatar=" + avatar + "&nickname=" + nickname
    })
  }
})
