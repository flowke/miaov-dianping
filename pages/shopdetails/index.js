const req = require('../../api/req')
// pages/shopdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    shopID: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      shopID: query.id
    });
    req.getShopDetail(query.id)
    .then(res=>{
      console.log(res, 'detail');
      this.setData({
        info: res.info
      })
    })
  },

  onAddFav(){
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      let {openId} = userInfo;
      req.addfav({
        open_id: openId,
        article_id: this.data.shopID
      })
      .then(res=>{
        console.log(res,'fav');
      })
    }else{

    }

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
