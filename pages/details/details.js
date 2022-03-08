// pages/details/details.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookinfo: {},
        loadingHidden: true,
        collect_yes: false,
        bookname: "",
        booklink: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let link = options.link ? options.link: "/book/5499203/ac60de"
        let bookname = options.bookname ? options.bookname: "小王子"
        console.log(link, bookname)
        this.setData({
            bookname: bookname,
            booklink: link
        })

        this.setData({
            loadingHidden: false
        })

        wx.request({
          url: app.globalData.baseURL + "/getBookDetail?booklink=" + link ,
          success: res => {
              this.setData({
                  bookinfo: res.data.data[0]
              })
              console.log(res)
              this.setData({
                loadingHidden: true
            })
          }
        })

        wx.getStorage({
            key: "token",
            success: token => {
                wx.request({
                    url: app.globalData.baseURL + "/collects/isCollectedByBookLink?booklink=" + link + "&token=" + token.data,
                    success: res => {
                        this.setData({
                            collect_yes: res.data.data[0] == true
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
    addCollect(e) {
        var that = this
        console.log(e.currentTarget.dataset)
        wx.getStorage({
            key: "token",
            success: token => {
                wx.request({
                    url: app.globalData.baseURL + "/collects",
                    method: "post",
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                      bookauthor: e.currentTarget.dataset.bookauthor,
                      bookimage: e.currentTarget.dataset.bookcover,
                      booklink: e.currentTarget.dataset.booklink,
                      bookname: e.currentTarget.dataset.bookname,
                      bookpublisher: e.currentTarget.dataset.publisher,
                      token: token.data
                    },
                    success: res => {
                        if(res.data.code == 1000) {
                            wx.showToast({
                              title: '收藏成功',
                            })
                            that.setData({
                                collect_yes: !that.data.collect_yes
                            })
                        }else {
                            wx.showToast({
                              title: res.data.msg,
                              icon: "error"
                            })
                        }
                    }
                  })
            }
        })
    },
    getDownload(e) {
        this.logDownloadHistory()

        this.setData({
            loadingHidden: false
        })
        wx.request({
          url: app.globalData.baseURL + "/downloads/getDownloadLink?dl=" + this.data.bookinfo.download + "&booklink=" + this.data.bookinfo.booklink,
          success: res => {
              console.log(res.data.data)
              this.setData({
                loadingHidden: true
            })
              if(res.data.code == 1000) {
                  wx.showToast({
                    title: '解析下载地址成功',
                    success: toast => {
                        wx.downloadFile({
                          url: res.data.data[0].link,
                          success: downloadRes => {
                              console.log(downloadRes)
                          }
                        })
                    }
                  })
              }
          }
        })
    },

    logDownloadHistory() {
        wx.getStorage({
            key: "token",
            success: token => {
                if(token.data) {
                    wx.request({
                        url: app.globalData.baseURL + "/downloads",
                        method: "post",
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          bookname: this.data.bookinfo.name,
                          booklink: this.data.booklink,
                          token: token.data,
                          bookimage: this.data.bookinfo.cover,
                          bookauthor: this.data.bookinfo.author,
                          bookpublisher: this.data.bookinfo.publisher,
                        },
                        success: res=>{
                            console.log(res)
                        }
                      })
                }
            }
        })
    }
})