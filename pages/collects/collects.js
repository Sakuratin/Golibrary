// pages/collects/collects.js
var app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      collects: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.getStorage({
        key: "token",
        success: token => {
          wx.request({
            url: app.globalData.baseURL + "/collects/getAllCollectByToken",
            data: {
              token: token.data
            },
            success: res => {
              console.log(res)
              let results = []

              res.data.data.forEach(item => {
                item.createtime = item.createtime.substr(0, 16).replace("T", " ")
                results.push(item)
              });
              this.setData({
                collects: results
              })
            }
          })
        }
      })
    },
    goback() {
        wx.navigateBack({
          delta: 0,
        })
    },
    toDetail(e) {
      let link = e.currentTarget.dataset.link
      let bookname = e.currentTarget.dataset.bookname
      
      wx.navigateTo({
        url: '/pages/details/details?link=' + link + "&bookname=" + bookname
      })
    },
})