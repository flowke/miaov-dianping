const api = require('../helper/api');
var config = require('../config')

let baseURL = 'https://wx.miaov.com';

let reqWithKey = (op)=>{
  return api.request({
    header: {
      'X-WX-Skey': wx.getStorageSync('SESSION_KEY'),
      ...(op.header || {} )
    },
    ...op
  })
}

exports.getShops = (data)=>{
  return reqWithKey({

    url: baseURL + '/index.php/article/shoplist',
    data
  })
  .then(res=>res.data)
}

let login = exports.login = (userResult)=>{

  return api.login()
  .then(res=>{
    return api.request({
      url: baseURL + '/login',
      header: {
        'X-WX-Code': res.code,
        'X-WX-Encrypted-Data': userResult.encryptedData,
        'X-WX-IV': userResult.iv,
      }
    });
  })
  .then(({data:res})=>{
    if(res.code===0){
      wx.setStorageSync('SESSION_KEY', res.data.skey);
      return {
        code: 0,
        data: res.userinfo
      }
    }else{
      return res;
    }
  })
}

exports.getUser = ()=>{

  return api.getUserInfo()
  .then(res=>login(res))
  .then(res=>{
    return reqWithKey({
      url: baseURL + '/user'
    });
  })
  .then(res=>res.data)
}
