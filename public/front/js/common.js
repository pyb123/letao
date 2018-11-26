// 进行scroll区域初始化
mui('.mui-scroll-wrapper').scroll({
    indicators: false,  //不让有滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:4000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 专门用于解析地址栏的参数
function getSearch( k ){
  // 获取地址栏的参数
  var str = location.search;
  // 解码成中文
  str = decodeURI(str);
  // 去掉？
  str = str.slice(1);
  // 将字符串切割成数组
  var arr = str.split('&');

  // 遍历数组

  var obj = {};

  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];

    obj[key] = value;
  })

  return obj[k];
}