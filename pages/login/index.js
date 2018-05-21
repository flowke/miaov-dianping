const req = require('../../api/req');
Page({
  query: {},
  onGetUserInfo({detail}){
    let {path} = this.query;
    if(detail.userInfo){
      req.login(detail)
      .then(res=>{
        wx.setStorageSync('userInfo', res);
        wx.navigateBack()
      })
    }
  },
  onLoad(query){
    this.query = query;
  }
})
