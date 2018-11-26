$(function() {
  // 一进入页面，发送请求，获取当前的购物车的数据
  // 如果用户未登录，后台会返回error，拦截到登录页
  // 如果用户已登录，后台返回购物车数据
    render();

  function render() {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      dataType: "json",
      success: function(info) {
        console.log(info);
        if (info.error === 400) {
          // 拦截到登录页
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        // 说明用户已登录，会返回购物车数据info是一个数组
        var htmlStr = template("cartTpl", { list: info });
        $(".mui-table-view").html(htmlStr);
      }
    });
  }

  // 2-删除功能
  // 给所有的删除按钮，添加点击事件(事件委托)
  // 获取当前商品id
  // 发送ajax请求，重新渲染
  $(".lt_main").on("click", ".btn_delete", function() {
    // 获取id
    var id = $(this).data("id");
    // 发送ajax
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: [id]
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 删除成功
          render();
        }
      }
    });
  });
});
