// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit(e) {
    let email = e.detail.value.email
    let password = e.detail.value.password

    if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
      wx.showToast({
        title: '请确认邮箱格式正确！',
        icon: "error",
        success: res=> {}
      })
    }
    this.setData({
      loadingHidden: false
    })
    wx.request({
      url: app.globalData.baseURL + "/users/userLogin",
      method: "post",
      data: {
        email: email,
        password: password
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setData({
          loadingHidden: true
        })
        if(res.data.code == 1000) {
          wx.showToast({
            title: '登陆成功',
            duration: 1000,
            success: toast => {
              wx.setStorage({
                key: "token",
                data: res.data.data[0]
              })
              setInterval(() => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1200)
            }
          })
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: "error"
          })
        }
      }
    })

  },
  wxLogin() {
    
    // 微信登陆
    wx.getUserProfile({
      desc: '获取您的资料并且登陆',
      success: user => {
        this.setData({
          loadingHidden: false
        })
        wx.login({
          success: res => {
            if(res.code) {
              wx.request({
                url: app.globalData.baseURL + "/users/userLogin",
                method: "post",
                data: {
                  code: res.code
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: response => {
                  this.setData({
                    loadingHidden: true
                  })
                  if(response.data.code == 1000) {
                    wx.showToast({
                      title: '登陆成功',
                      duration: 1000,
                      success: toast => {
                        wx.setStorage({
                          key: "token",
                          data: response.data.data[0]
                        })
                        setInterval(() => {
                          wx.switchTab({
                            url: '/pages/search/search',
                          })
                        }, 1200)
                      }
                    })
                  }else {
                    wx.showToast({
                      title: response.data.msg,
                      icon: "error"
                    })
                }
                }
            })
            }
          }
        })
      }
    })
  },
  toRegister() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})