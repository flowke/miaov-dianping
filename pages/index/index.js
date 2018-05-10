//index.js
const req = require('../../api/req');
//获取应用实例
const app = getApp()

Page({
  data: {
    curtCity: '北京'
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad(){
    // 初始化城市
    let city = wx.getStorageSync('curtCity');
    if(!city) city = '北京';
    this.setData({
      curtCity: city
    });
  },
  onShow: function () {
    req.getShops({
      page:1,
      rows: 20
    })
    .then(res=>{
      console.log(res);
    })


  },
  getUserInfo: function(e) {

  }
})
