// pages/register/register.js
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
    console.log(e.detail)
    

    // this.setData({
    //   o
    // })
    console.log("register")
    

    // wx.login({
    //   success: res => {
    //     if(res.code) {
    //       console.log("code: " + res.code)
    //     }
    //   }
    // })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
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
  emailInput(e) {
    console.log(e.detail.value)
    this.setData({
      email: e.detail.value
    })
  },
  passwordInput(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },
  repasswordIput(e) {
    console.log(e.detail.value)
    this.setData({
      repassword: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  submitForm(e) {
    let email = this.data.email
    let password = this.data.password
    let repassword = this.data.repassword

    if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
      wx.showToast({
        title: '请确认邮箱格式正确！',
        icon: "error",
        success: res=> {}
      })
    }

    if(password !== repassword) {
      wx.showToast({
        title: '两次密码不相同！',
        icon: "error",
        success: res=> {}
      })
      return ;
    }
    wx.getUserProfile({
      desc: '用于完善注册信息',
      success: user => {
        console.log(user)
        let info = user.userInfo
        let post_data = {
          nickname: info.nickName,
          imageurl: info.avatarUrl,
          email: email,
          password: password
        }
        this.setData({
          loadingHidden: false
        })
        wx.login({
          success: login => {
            if(login.code) {
              post_data.code = login.code
            }

            wx.request({
              url: app.globalData.baseURL + "/users/userRegister",
              method: "post",
              data: post_data,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: res => {
                this.setData({
                  loadingHidden: true
                })
                if(res.data.code == 1000) {
                  wx.showToast({
                    title: '注册成功',
                  })
                }else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: "error",
                  })
                }
              }
            })
          }
        })
      },
      fail: err => {
        console.log(err)
      }
    })
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