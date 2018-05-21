const req = require('../../api/req');
const api = require('../../helper/api');
const qqmap = api.createQQMap('THSBZ-P32RD-6ML46-HC3NN-XRGJ5-ZTBUK');
// pages/shopdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    shopID: null,
    hasFav: false,
    favID: '',
    location: ''
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
      this.setData({
        info: res.info
      });
      return res.info;
    })
    .then(info=>{
      let userInfo = wx.getStorageSync('userInfo');

      qqmap.reverseGeocoder({
        location: {
          latitude: info.lat,
          longitude: info.lng
        }
      })
      .then(res=>{
        let loc = '';
        let {
          address,
          formatted_addresses
        } = res.result;

        if(address) loc = address;
        if(formatted_addresses) loc = formatted_addresses.recommend;

        this.setData({
          location: loc
        })

      });

      return req.checkFav({
        open_id: userInfo.openId,
        article_id: info.id
      })
    })
    .then(res=>{
      if(res.code===0){
        this.setData({
          favID: res.fav_id
        });
      }
    })

  },

  onAddFav(){
    let userInfo = wx.getStorageSync('userInfo');
    let {favID} = this.data;

    if(!userInfo){
      wx.navigateTo({url:'/pages/login/index'});
      return;
    }

    if(favID){
      req.delfav({
        open_id: userInfo.openId,
        article_id: this.data.shopID,
        fav_id: favID
      })
      .then(res=>{
        if(res.code===0){
          this.setData({
            favID: ''
          })
        }
      })
    }else{
      req.addfav({
        open_id: userInfo.openId,
        article_id: this.data.shopID
      })
      .then(res=>{
        if(res.code===0){
          this.setData({
            favID: res.fav_id
          })
        }

      })
    }
  },
})
