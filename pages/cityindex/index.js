const api = require('../../helper/api');
const cityData = require('./cityData');

const qqmap = api.createQQMap('THSBZ-P32RD-6ML46-HC3NN-XRGJ5-ZTBUK');

let hotCity = [
  '上海',
  '北京',
  '广州',
  '深圳',
  '天津',
  '杭州',
  '南京',
  '苏州',
  '成都',
  '武汉',
  '重庆',
  '西安'
]

// pages/cityindex/index.js
Page({
  currentPageScrollY: 0,
  /**
   * 页面的初始数据
   */
  data: {
    cityData,
    hotCity,
    historyCity: [],
    locateCity: '',
    hasAuthLocation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    console.log('load');

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

    let historyCity = wx.getStorageSync('historyCity');
    if(historyCity){
      this.setData({
        historyCity
      });
    };

    // 获取位置流程
    this._getLocation()
    .then(city=>{
      this.setData({
        locateCity: city,
        hasAuthLocation: true
      })
    })
    .catch(e=>{
      if(e.errMsg === 'authorize:fail auth deny'){
        this.setData({
          hasAuthLocation: false
        })
      }
    });


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
  onAuthLocation(){
    this._getLocation()
    .then(city=>{
      this.setData({
        locateCity: city,
        hasAuthLocation: true
      })
    })
    .catch(e=>{
      if(e.errMsg === 'authorize:fail auth deny'){
        api.openSetting();
      }
    })
  },
  _getLocation(){

    return api.authorize({
      scope: 'scope.userLocation'
    })
    .then(res=>{
      return api.getLocation({type: 'gcj02'})
    })
    .then(res=>qqmap.reverseGeocoder({
      location: {
        latitude: res.latitude,
        longitude: res.longitude
      }
    }))
    .then(res=>{
      let {city} = res.result.address_component;
      return city;
    });


  },
  _getLocationAuth(){
    return api.getSetting()
    .then(({authSetting})=>{
      return authSetting['scope.userLocation'];
    });
  },
  _init(){

    let query = wx.createSelectorQuery().in(this);
    query.selectAll('.index-list>.sel-item')
    .boundingClientRect(rects=>{
      this.posArrInfo = rects.map(elt=>({
        top: parseInt(elt.top),
        bottom: parseInt(elt.bottom),
        id: elt.id
      }));
    }).exec();

  },

  // onCityLetterTap({target}){
  //   if(target.dataset.type!=='fastCheck') return ;
  //   this.currentID = target.id;
  //   this.setData({
  //     scrollToID: `city-to-${target.id}`
  //   });
  //
  // },
  // onLetterTouchMove(ev){
  //   let {clientY} = ev.touches[0];
  //   let letter = this.posArrInfo.filter(elt=>{
  //     return clientY > elt.top && clientY < elt.bottom
  //   })[0];
  //
  //   if(letter && letter.id !== this.currentID){
  //
  //     this.currentID = letter.id;
  //     this.setData({
  //       scrollToID: `city-to-${letter.id}`
  //     });
  //   }
  // },
  // 如果是 view 的滚动
  onLetterTouchMove(ev){
    let {clientY} = ev.touches[0];
    let {nowSelLetter} = this;

    if(!nowSelLetter) nowSelLetter = {top:0,bottom:0}


    if(this._isInRange(clientY,nowSelLetter)) return;
    let letter = this.posArrInfo.find(elt=>{
      return this._isInRange(clientY, elt)
    });

    // console.log(letter);
    if(letter && letter.id !== this.currentID.id){
      this.currentID = letter.id;
      this.nowSelLetter = letter;

      this._scrollToCity(letter.id);
    }
  },
  _isInRange(clientY, rangeOBJ){
    return rangeOBJ.top <= clientY && clientY <= rangeOBJ.bottom
  },
  onCityLetterTap({target}){
    if(target.dataset.type!=='fastCheck') return ;
    this.currentID = target.id;
    this._scrollToCity(target.id);
  },
  _scrollToCity(id){
    let query = wx.createSelectorQuery().in(this)
    query.selectViewport().scrollOffset();
    query.select(`#city-to-${id}`).boundingClientRect();
    query.exec(res=>{
      let {scrollTop} = res[0];
      let domTop = res[1].top;

      wx.pageScrollTo({
        scrollTop: domTop + scrollTop,
        duration: 0
      });
    });
  },
  onSelectCity({currentTarget:elem}){

    let {historyCity} = this.data;
    let {name} = elem.dataset;
    let citys = [];

    let filterCitys = historyCity.filter(elt=>elt!==name);

    citys = [
      name,
      ...filterCitys
    ];

    wx.setStorageSync('historyCity', citys.slice(0,3));

    try {

      wx.setStorageSync('curtCity', name);
      wx.navigateBack();
    }catch(e){
      console.log('保存定位城市失败');
    }

  },
})
