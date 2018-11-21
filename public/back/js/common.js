$(function() {
  // 开启进度条
  // NProgress.start();
  // 关闭进度条
  // NProgress.done();

  // ajax全局事件
  // 需求：
  // 1-在第一个ajax发送的时候，开启进度条
  // 2-在全部的ajax完成之后，关闭进度条

  // ajaxComplete() 在每个ajax完成（不管是成功还是失败都调用）时调用
  // ajaxError()    在每个ajax如果失败时调用
  // ajaxSuccess()  在每个ajax如果成功时调用
  // ajaxSend()     在每个ajax即将要发送时调用

  // ajaxStart()  在第一个ajax请求发送时调用
  // ajaxStop()   在所有的ajax请求完成时调用

  $(document).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  });

  $(document).ajaxStop(function() {
    // 模拟网络延迟（实际工作中不介意使用）
    setTimeout(function() {
      // 关闭进度条
      NProgress.done();
    }, 500);
  });

  //   公用的功能：
  // 1-左侧二级切换功能
  $("#category").click(function() {
    //   找下一个兄弟元素
    $(this)
      .next()
      .stop()
      .slideToggle();
  });
  // 2-左侧菜单功能
  $(".lt_topbar .icon_left").click(function() {
    //   让左侧的侧边栏切换
    $(".lt_aside").toggleClass("hideMenu");
    $(".lt_topbar").toggleClass("hideMenu");
    $(".lt_main").toggleClass("hideMenu");
  });
  // 3-右侧退出功能
  $(".lt_topbar .icon_right").click(function() {
    // 显示退出模态框
    $("#logoutModal").modal("show");
  });

  $("#logoutBtn").click(function() {
    //   调用接口，让后台销毁当前用户的登录状态
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 销毁登录状态成功，跳转到登录页
          location.href = "login.html";
        }
      }
    });
  });
});
