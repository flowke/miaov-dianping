const req = require('../../api/req');
Page({
  query: {},
  onGetUserInfo({detail}){
    let {path} = this.query;
    if(detail.userInfo){
      req.login(detail)
      .then(res=>{

        wx.redirectTo({
          url: path ? path : '/pages/index/index'
        })
      })
    }
  },
  onLoad(query){
    this.query = query;
  }
})
