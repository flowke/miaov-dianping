const req = require('../../api/req');
Page({
  onGetUserInfo({detail}){
    if(detail.errMsg!=='getUserInfo:fail auth deny'){
      req.login(detail)
      .then(res=>{
        
        wx.redirectTo({
          url: '/pages/index/index'
        })
      })
    }
  }
})
