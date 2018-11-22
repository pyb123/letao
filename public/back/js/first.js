$(function() {
  var currentPage = 1; //当前页
  var pageSize = 5; //每页条数

  render();

  function render() {
    // 发送ajax请求
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dateType: "json",
      success: function(info) {
        console.log(info);

        var htmlStr = template("firstTpl", info);
        $("tbody").html(htmlStr);

        // 分页
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,

          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 绑定页码点击事件
          onPageClicked: function(a, b, c, page) {
            console.log(page);

            currentPage = page;

            // 重新渲染
            render();
          }
        });
      }
    });
  }

  //   2-点击添加按钮
  $("#addBtn").click(function() {
    $("#addModal").modal("show");
  });

  // 3-表单校验功能
  $("#form").bootstrapValidator({
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    // 配置字段
    fields: {
      categoryName: {
        validators: {
          // 配置非空
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  // 4-注册表单校验成功事件，阻止默认的表单提交，通过ajax提交
  $('#form').on('success.form.bv',function(e){
    // 阻止默认提交
      e.preventDefault();

      //ajax请求
      $.ajax({
          type:'post',
          url: '/category/addTopCategory',
          data: $('#form').serialize(),
          dataType:'json',
          success: function(info){
            console.log(info);
            if(info.success){
                // 添加成功
                // 关闭模态框，
                $('#addModal').modal('hide');
                // 重新渲染第一页
                currentPage = 1;
                render();
                // 内容和状态需要充值
                $('#form').data('bootstrapValidator').resetForm(true);
            }
          }
      })
  })
});
