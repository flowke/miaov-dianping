const req = require('../../api/req');
const api = require('../../helper/api');
// page/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    hasLogin: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    api.getSetting()
    .then(res=>{
      if(res.authSetting['scope.userInfo']){
        return api.getUserInfo();
      }else{
        throw '没有授权用户信息'
      }
    })
    .then(res=>{
      let userInfo = wx.getStorageSync('userInfo');
      return userInfo ? userInfo : req.login(res);
    })
    .then(res=>{

      if(!res) return;
      this.setData({
        hasLogin: true,
        user: res
      });
      wx.setStorageSync('userInfo', res);
    })
    .catch(e=>{
      console.log(e);
    })
  },

  onGetUserInfo({detail}){
    if(!detail.userInfo) return ;
    req.login(detail)
    .then(info=>{
      wx.setStorageSync('userInfo', info);
      this.setData({
        user: info,
        hasLogin: true
      })
    });

  },
})
