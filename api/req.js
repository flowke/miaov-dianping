const api = require('../helper/api');
var config = require('../config')

let baseURL = 'http://www.koocv.com';

let reqWithKey = (op)=>{
  return api.request({
    header: {
      'X-WX-Skey': wx.getStorageSync('SESSION_KEY'),
      ...(op.header || {} )
    },
    ...op
  })
}

exports.getCategory = ()=>{
  return reqWithKey({
    url: baseURL + '/article/category',
    // method: 'POST'
  }).then(res=>res.data)
}

exports.getShops = (data)=>{
  return reqWithKey({

    url: baseURL + '/article/shoplist',
    method: 'POST',
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

exports.getShopDetail = (id)=>{
  return reqWithKey({
    url: baseURL + '/article/detail',
    data: {id},
    method: 'POST'
  }).then(res=>res.data)
}

exports.getUser = ()=>{

  return api.getUserInfo()
  .then(res=>login(res))
  .then(res=>{
    return reqWithKey({
      url: baseURL + '/wx/login',
    });
  })
  .then(res=>res.data)
}
