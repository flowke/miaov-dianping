1.获取收藏列表
URL: 域名/index.php/fav/getlist?callback=jQuery111307357226584186844_1525699312316
POST:传参
open_id:微信登陆后到open_id（POST传）

返回结果说明:
jQuery111307357226584186844_1525699312316({code: 0, data: [{fav_id: "1", shop_id: "123", create_time: "2018-10-05 00:00:00"}]})

code : 0 成功
没有数据时
data : '' 为空
有数据时
data: [{fav_id: "1", shop_id: "123", create_time: "2018-10-05 00:00:00"}]

data [
    fav_id:收藏到自增ID(唯一的) 用于删除使用
    shod_id:收藏到商品ID(唯一的)
    create_time:收藏到时间
]


code : 1
msg  : 登陆失效


2.增加收藏
URL: 域名/index.php/fav/addfav?callback=jQuery111307357226584186844_1525699312316

POST:传参
open_id:微信登陆后到open_id（POST传）
shop_id:商品id（POST传）
返回结果说明:
jQuery111307357226584186844_1525699312316({code: 0, msg: "收藏成功"})

code:0 msg:收藏成功
code:1 msg:登陆失效
code:2 msg:收藏内容不存在
code:3 msg:收藏失败


3.增加收藏
URL: 域名/index.php/fav/delfav?callback=jQuery111307357226584186844_1525699312316

POST:传参
open_id:微信登陆后到open_id（POST传）
fav_id:收藏到id
返回结果说明:
jQuery111307357226584186844_1525699312316({code: 0, msg: "取消成功"})

code:0 msg:取消成功
code:1 msg:登陆失效
code:2 msg:收藏内容不存在
code:3 msg:取消失败


4.获取分类信息
获取接口
URL: 域名/index.php/article/category?callback=jQuery111307357226584186844_1525699312316



5.分页获取数据获取（数据文件放在自己服务器到域名下，配置好后告诉我即可）
获取接口
URL: 域名/index.php/article/shoplist?page=1&rows=20&callback=jQuery111307357226584186844_1525699312316
GET:page(页码)
    rows(每页显示条数)

POST:传参
order: desc(降序)/asc(升序)
sort:range(范围)/sort(排序)
category:index(首页)/其他到分类自定义  美食 KTV 酒店 丽人/美发 足疗/按摩

6.获取文章详情
获取接口
URL: 域名/index.php/article/detail?callback=jQuery111307357226584186844_1525699312316
article_id:文章ID

4/5/6 当返回数据有error时“数据加载失败”




4/5/6 数据放在（全部是json形式）
服务器地址/data/data-index.js   其中index为category(频道：美食 KTV 酒店 丽人/美发 足疗/按摩 等等)
数据[{"article_id":1,"name":"\u996d\u99861","cost":"100\/\u4eba","distance":100,"score":2000,"tag":"<span>\u6807\u7b7e1<\/span><span>\u6807\u7b7e2<\/span>"},{"article_id":2,"name":"\u996d\u99861","cost":"120\/\u4eba","distance":200,"score":3000,"tag":"<span>\u6807\u7b7e1<\/span><span>\u6807\u7b7e2<\/span>"},{"article_id":3,"name":"\u996d\u99861","cost":"130\/\u4eba","distance":300,"score":4000,"tag":"<span>\u6807\u7b7e1<\/span><span>\u6807\u7b7e2<\/span>"},{"article_id":4,"name":"\u996d\u99861","cost":"140\/\u4eba","distance":400,"score":5000,"tag":"<span>\u6807\u7b7e1<\/span><span>\u6807\u7b7e2<\/span>"},{"article_id":5,"name":"\u996d\u99861","cost":"150\/\u4eba","distance":500,"score":6000,"tag":"<span>\u6807\u7b7e1<\/span><span>\u6807\u7b7e2<\/span>"}]


服务器地址/data/data-category.js  文章分类信息
数据{"ktv":"KTV","food":"\u7f8e\u98df","hotel":"\u9152\u5e97","film":"\u7535\u5f71","tourism":"\u65c5\u6e38"}

服务器地址/data/detail/id.js    文章内容页
数据：随意传入任何json数据

