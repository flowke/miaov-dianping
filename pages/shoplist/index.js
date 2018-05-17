const req = require('../../api/req');
// pages/shoplist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    showListLoading: false,
    isLoadAll: false,
    page: 1,
    filterType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    let {id} = query;
    this.category_id = id;
    req.getShops({
      category_id: id,
    },{
      page: 1,
      rows:6
    })
    .then(res=>{
      if(!res.error){
        this.setData({
          shopList: res
        })
      }
    })
  },

  onScrollToLower(){

    let {page, shopList, showListLoading, isLoadAll} = this.data;

    if(showListLoading || isLoadAll) return;
    if(page===1) page++;
    console.log('---');
    this.setData({
      showListLoading: true
    });
    req.getShops({
      category_id: this.category_id
    },{
      page: page,
      rows: 6
    })
    .then(res=>{
      if(res.error){
        this.setData({
          isLoadAll: true,
          showListLoading: false
        })
      }else{
        this.setData({
          shopList: [...shopList,...res],
          page: page +1,
          showListLoading: false
        });
      }

    })
  },

  onFilter({target}){
    let {dataset} = target;
    if(dataset.type==='range'){
      this.setData({
        filterType: 'range'
      })
    }else if(dataset.type==='sort'){
      this.setData({
        filterType: 'sort'
      })
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
