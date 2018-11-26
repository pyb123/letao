$(function() {
  // 1. 从列表页获取id
  var productId = getSearch("productId");

  // 2. 根据productId发送ajax请求
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function(info) {
      console.log(info);

      var htmlStr = template("productTmp", info);
      $(".lt_main .mui-scroll").html(htmlStr);

      // 轮播图轮播初始化
      //获得slider插件对象初始化
      var gallery = mui(".mui-slider");
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 重新初始化数字框
      mui('.mui-numbox').numbox()
    }
  });

  // 3.给尺码添加可选功能
  $('.lt_main').on('click','.lt_size span',function(){
    // 给
      $(this).addClass('current').siblings().removeClass('current');
  });

  // 4.加入购物车功能
  $('#addCart').click(function(){

    // 获取尺码，数量
    var size = $('.lt_size span.current').text();

    if(size == null){
      mui.toast('请选择尺码');
      return;
    }

    var num = $('.mui-numbox-input').val();


    // 发送ajax
    $.ajax({
      type:'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        size: size,
        num: num
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        if(info.error === 400){
          // 未登录，跳转到登录页,由于登录成功还有跳回来，可以将整个当前页面的地址作为参数传递过去
          location.href = "login.html?retUrl="+location.href;
          return;
        }

        if(info.success){
          // 给用户提示
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            // e.index 标记当前点击按钮下标
            if(e.index === 0){
              // 去购物车
              location.href = 'cart.html';
            }
          })
        }
      }
    })

  })
});
