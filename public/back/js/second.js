//

$(function() {
  var currentPage = 1;  //当前页
  var pageSize = 5; //每页条数

  // 1-一进入页面，发送ajax，进行渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);

        var htmlStr = template("second", info);
        $("tbody").html(htmlStr);

        // 分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),

          onPageClicked: function(a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        });
      }
    });
  }

  // 2-点击添加分类按钮，显示模态框
  $("#addBtn").click(function() {
    // 显示模态框
    $("#addModal").modal("show");

    // 发送ajax请求，请求所有的一级分类列表
    // 通过传参 page = 1  pagesize=100 模拟请求所有一级分类列表的接口
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        var htmlStr = template("dropdown", info);
        $(".dropdown-menu").html(htmlStr);
      }
    });
  });

  // 3-给下拉菜单添加选中功能
  $(".dropdown-menu").on("click", "a", function() {
    $("#dropdownText").text(this.text);

    // 获取a中自定义的id
    var id = $(this).data("id");
    // 赋值给隐藏域
    $('[name="categoryId"]').val(id);

    // 手动将隐藏域的校验状态，改成成功
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');

  });

  // 4-调用fileupload方法，发送文件上传
  $("#fileupload").fileupload({
    // 返回的数据类型
    dataType: "json",
    // e：事件对象
    // data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      console.log(data);

      var result = data.result; //后台返回的结果
      // 获取图片地址，赋值给img的src
      var picUrl = result.picAddr;

      $("#imgBox img").attr("src", picUrl);

      // 将图片地址赋值给隐藏域
      $('[name="brandLogo"]').val(picUrl);

        // 重置隐藏域的校验状态
        $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        
    }
  });

  // 5-表单验证
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 需要对隐藏域进行校验
    excluded: [],

    // 2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    // 3. 指定字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });
});
