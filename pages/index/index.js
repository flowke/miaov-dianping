//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    curtCity: '北京'
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onShow: function () {
    let city = wx.getStorageSync('curtCity');
    if(!city) city = '北京';
    this.setData({
      curtCity: city
    });
  },
  getUserInfo: function(e) {

  }
})
