//index.js
const req = require('../../api/req');
const api = require('../../helper/api');
//获取应用实例
const app = getApp()

Page({
  data: {
    curtCity: '北京',
    guessLike: [],
    page: 1,
    showListLoading: false,
    isLoadAll: false,
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad(){

    // req.getCategory()
    // .then(res=>{
    //   console.log(res,'category');
    // })

    req.getShops(null,{
      page:1,
      rows: 6
    })
    .then(res=>{
      this.setData({
        guessLike: [...res]
      })
    });

  },
  onShow: function () {
    let city = wx.getStorageSync('curtCity');
    if(city){
      this.setData({
        curtCity: city
      });
    }
  },
  onReachBottom(){

    let {page, guessLike, showListLoading, isLoadAll} = this.data;

    if(showListLoading || isLoadAll) return;
    if(page===1) page++;
    this.setData({
      showListLoading: true
    });
    req.getShops(null,{
      page: page,
      rows: 6
    })
    .then(res=>{
      if(res.error){
        this.setData({
          isLoadAll: true,
          showListLoading: false
        })
      }else{
        this.setData({
          guessLike: [...guessLike,...res],
          page: page +1,
          showListLoading: false
        });
      }

    });
  },
  getUserInfo: function(e) {

  }
})
