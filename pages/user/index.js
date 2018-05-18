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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
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
