const cityData = require('./cityData');

// pages/cityindex/index.js
Page({
  currentPageScrollY: 0,
  /**
   * 页面的初始数据
   */
  data: {
    cityData,
    isHideMask: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this._init();
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

  },
  _init(){

    let query = wx.createSelectorQuery().in(this);
    query.selectAll('.index-list>.sel-item')
    .boundingClientRect(rects=>{

      this.posArrInfo = rects.map(elt=>({
        top: elt.top,
        bottom: elt.bottom,
        id: elt.id
      }));
    }).exec();
  },

  onCityLetterTap({target}){

    if(target.dataset.type!=='fastCheck') return ;
    this.currentID = target.id;
    this._scrollToCity(target.id);
  },
  onForbidOverflow(){
    this.setData({isHideMask: false})
  },

  onLetterTouchMove(ev){
    let {clientY} = ev.touches[0];
    let letter = this.posArrInfo.filter(elt=>{
      return clientY > elt.top && clientY < elt.bottom
    })[0];

    if(letter && letter.id !== this.currentID){
      this.currentID = letter.id;

      this._scrollToCity(letter.id);
    }

    // console.log(ev.currentTarget);
  },
  onApproveOverflow(){
    this.setData({isHideMask: true})
  },
  _scrollToCity(id){
    let query = wx.createSelectorQuery().in(this)
    query.selectViewport().scrollOffset();
    query.select(`.city-index.${id}`).boundingClientRect();
    query.exec(res=>{
      let {scrollTop} = res[0];
      let domTop = res[1].top;

      wx.pageScrollTo({
        scrollTop: domTop + scrollTop,
        duration: 0
      });
    });
  }
})
