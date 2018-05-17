const api = require('../helper/api');
var config = require('../config')

let baseURL = 'http://www.koocv.com';

let reqWithKey = (op)=>{

  if(!op.header) op.header = {};
  return api.request({
    ...op,
    header: {

      'X-WX-Skey': wx.getStorageSync('SESSION_KEY'),
      'Content-Type': 'application/x-www-form-urlencoded',
      ...op.header
    },
  })
}

exports.getCategory = ()=>{
  return api.request({
    url: baseURL + '/article/category',
    method: 'POST'
  }).then(res=>res.data)
}

exports.getShops = (data,q)=>{
  return api.request({
    url: baseURL + `/article/shoplist?rows=${q.rows}&page=${q.page}`,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data
  })
  .then(res=>res.data)
}

let login = exports.login = (userResult)=>{

  return api.login()
  .then(res=>{
    return api.request({
      url: 'https://wx.miaov.com' + '/login',
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
      return res.data.userinfo;
    }else{
      throw res
    }
  })
}

exports.getShopDetail = (id)=>{
  return api.request({
    url: baseURL + '/article/detail',
    data: {id},
    // method: 'POST'
  }).then(res=>res.data)
}

exports.getUser = ()=>{

  return api.getUserInfo()
  .then(res=>login(res))
  .then(res=>{
    return reqWithKey({
      url: 'https://wx.miaov.com' + '/user',
    });
  })
  .then(res=>res.data)
}
// {
//  open_id
//  article_id
// }
exports.addfav = (data)=>{
  return reqWithKey({
    url: baseURL + '/fav/addfav',
    method: 'POST',
    data
  }).then(res=>res.data);
}
//
exports.delfav = (data)=>{
  return reqWithKey({
    url: baseURL + '/fav/delfav',
    method: 'POST',
    data
  }).then(res=>res.data);
}

exports.getfav = (open_id)=>{
  return reqWithKey({
    url: baseURL + '/fav/getlist',
    method: 'POST',
    data: {
      open_id
    }
  }).then(res=>res.data);
}
