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