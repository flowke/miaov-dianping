const api = require('../helper/api');

let baseURL = 'http://wx.miaov.com';

exports.getShops = (data)=>{
  return api.request({
    url: baseURL + '/index.php/article/shoplist',
    data
  })
  .then(res=>res.data)
}
