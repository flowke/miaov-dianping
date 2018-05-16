//index.js
const req = require('../../api/req');
const api = require('../../helper/api');
//获取应用实例
const app = getApp()

Page({
  data: {
    curtCity: '北京',
    guessLike: [],
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad(){

    req.getCategory()
    .then(res=>{
      console.log(res,'category');
    })

    req.getShops({
      page:1,
      rows: 20
    })
    .then(res=>{
      console.log(res);
      this.setData({
        guessLike: [...res]
      })
    });

  },
  onShow: function () {



  },
  getUserInfo: function(e) {

  }
})
