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
      console.log(res);
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

    api.getSetting()
    .then(res=>{
      if(!res.authSetting['scope.userInfo']){
        wx.redirectTo({
          url: '/pages/login/index'
        });
        throw new Error('未授权, 重定向到登录页');
      }else{
        return req.getUser();
      }
    })
    .then(res=>{

      if(res.code===0){
        return req.getShops({
          page:1,
          rows: 20
        });
      }else{
        throw new Error('未获取到用户信息')
      }
      // 初始化城市
      let city = wx.getStorageSync('curtCity');

      if(!city) city = '北京';
      this.setData({
        curtCity: city
      });
    })
    .catch(e=>{
      console.log(e);
    })

  },
  onShow: function () {



  },
  getUserInfo: function(e) {

  }
})
