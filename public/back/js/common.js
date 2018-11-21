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
    setTimeout(() => {
      // 关闭进度条
      NProgress.done();
    }, 500);
  });
});
