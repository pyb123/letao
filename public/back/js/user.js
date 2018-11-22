$(function() {
  var currentPage = 1; //当前页
  var pageSize = 5; //每一页的条数

  var currentId; //当前用户的id

  var isDelete; //修改的状态

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        //   template(id名字，对象)
        var htmlStr = template("tmp", info);
        $("tbody").html(htmlStr);

        // 分页插件测试
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          //设置大小
          //   size: "normal",
          //为按钮绑定点击事件 page:当前点击的按钮值
          onPageClicked: function(event, originalEvent, type, page) {
            // 当前页码
            console.log(page);
            //   根据page
            currentPage = page; //更新当前页
            // 根据当前页重新渲染
            render();
          }
        });
      }
    });
  }
  // 2-点击禁用启用按钮
  $("tbody").on("click", ".btn", function() {
    // 批量注册事件
    // 显示模态框
    $("#userModal").modal("show");

    // 获取用户id
    currentId = $(this).parent().data("id");

    // 获取修改的状态，根据按钮类名判断具体来传什么
    // 禁用按钮
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  //点击模态框的确认按钮，完成用户的启用禁用
  $("#submitBtn").click(function() {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId, //用户id
        isDelete: isDelete //将用户改成什么状态， 1启用 2禁用
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框，重新渲染
          $("#userModal").modal("hide");

          render();
        }
      }
    });
  });
});
