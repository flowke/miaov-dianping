// page/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      userName: "佚名",
      gender: 0,
      avatar: "",
      city: "未知"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.showLoading({
      title: '加载中'
    })
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res) {
        console.log(res);
        _this.setData({
          user: {
            userName: res.userInfo.nickName,
            gender: res.userInfo.gender,
            avatar: res.userInfo.avatarUrl,
            city: res.userInfo.city
          }
        });
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res);
      }
    })
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