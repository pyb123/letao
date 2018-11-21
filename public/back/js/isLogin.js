// ajax登录拦截
    // 由于功能需要，登录拦截，对于未登录的用户，拦截到登录页
    // 由于前端不知道当前用户的登录状态，但是后台知道
$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function(info) {
    console.log(info);
    if (info.success) {
      // 该用户已经登录
      console.log("该用户已经登录");
    }
    if (info.error == 400) {
      // 当前用户未登录,拦截到登录页
      location.href = "login.html";
    }
  }
});
