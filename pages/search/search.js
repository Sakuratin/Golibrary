// pages/search/search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    books: [
      {
        "cover": "https://covers.zlibcdn2.com/covers100/books/26/c3/03/26c303a8f1e8881a7a6bd59d57a76aef.jpg",
        "link": "/book/2475034/4b0c42",
        "name": "JavaScript and JQuery: Interactive Front-End Web Development",
        "publisher": "Wiley",
        "author": "Jon Duckett",
        "year": "2014",
        "language": "english",
        "filetype": "PDF",
        "filesize": " 91.50 MB"
      },
      {
        "cover": "https://covers.zlibcdn2.com/covers299/books/8e/83/68/8e83689665599548afb421470fac65ee.jpg",
        "link": "/book/5241668/c04be5",
        "name": "活着",
        "publisher": "南海出版公司",
        "author": "余华",
        "year": "2003",
        "language": "Chinese",
        "filetype": "PDF",
        "filesize": " 6.47 MB"
      },
      {
        "cover": "https://covers.zlibcdn2.com/covers200/books/e6/44/bb/e644bb6e2ce069b64c281725ce95f23a.jpg",
        "link": "/book/5731866/00cd8e",
        "name": "恶意",
        "publisher": "南海出版公司",
        "author": "东野圭吾",
        "year": "2016",
        "language": "Chinese",
        "filetype": "EPUB",
        "filesize": " 209 KB"
      }
    ]
  },

  searchEvent(e) {
    let data = e.detail.value
    this.setData({
      loadingHidden: false
    })

    wx.request({
      url: app.globalData.baseURL + '/search?keyword=' + data,
      success: res => {
        console.log(res)
        this.setData({
          books: res.data.data[0]
        })
        this.setData({
          loadingHidden: true
        })

      }
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