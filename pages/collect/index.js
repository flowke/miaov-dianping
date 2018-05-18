const req = require('../../api/req');
// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');


    req.getfav(userInfo.openId)
    .then(res=>{
      if(res.code===0){

        this.setData({
          list: res.data.map(item=>item.info)
        })
      }
    })
  }
})
