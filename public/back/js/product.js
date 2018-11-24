$(function() {
  var currentPage = 1;
  var pageSize = 2;

  var picArr = [];

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);

        //1-
        var htmlStr = template("productTmp", info);
        $("tbody").html(htmlStr);

        //2
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  $("#addBtn").click(function() {
    // 显示模态框
    $("#addModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function(info) {
        console.log(info);

        var htmlStr = template("dropdownTmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    });
  });

  $(".dropdown-menu").on("click", "a", function() {
    var txt = $(this).text();
    $("#dropdownText").text(txt);

    // 获取id
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);

    // 重置隐藏域的状态
    $("#form")
      .data("bootstrapValidator")
      .updateStatus("brandId", "VALID");
  });

  //4-配置fileupload 文件上传
  $("#fileupload").fileupload({
    // 返回的数据类型
    dataType: "json",
    // 文件上传的回调函数
    done: function(e, data) {
      console.log(data.result);
      // console.log(data);
      // 图片信息（图片名称，图片地址）
      var picObj = data.result;

      picArr.unshift(picObj);
      console.log(picArr);

      //获取图片地址，将图片添加到结构最前面
      var picUrl = picObj.picAddr;

      $("#imgBox").prepend('<img src="' + picUrl + '"style="width: 100px">');

      //如果长度>3,如果超出长度范围，需要将最后一项删除
      if (picArr.length > 3) {
        picArr.pop();

        //删除最后一张图片
        // img：last-child  找最后一个孩子，再判断是不是img类型的
        // last-of-typ：同类型中的最后一个元素
        // img:last-of-type  找到最后一个img类型的元素
        //  $('#imgBox img').eq($(#imgBox img).length - 1)
        $("#imgBox img:last-of-type").remove();
      }

      console.log(picArr);
      if (picArr.length === 3) {
        // 图片上传满3张
        $("#form")
          .data("bootstrapValidator")
          .updateStatus("picStatus", "VALID");
      }
    }
  });

  // 5-配置表单校验
  $("#form").bootstrapValidator({
    // 配置排除项
    excluded: [],

    // 配置小图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", // 校验成功
      invalid: "glyphicon glyphicon-remove", // 校验失败
      validating: "glyphicon glyphicon-refresh" // 校验中
    },

    // 设置字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则校验
          regexp: {
            // *  0到多次
            // ？  0或1次
            // {m，n}  m或n次
            regexp: /^[1-9]\d*$/,
            message: "商品库存必须是非零开头的数字"
          }
        }
      },

      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          },
          //正则校验
          regexp: {
            // *()
            regexp: /^\d{2}-\d{2}$/,
            message: "必须是xx-xx的格式，xx是两位的数字，例如：36-44"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },

      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  // 6-注册表单校验成功事件，阻止默认的提交，ajax提交
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();

    // 表单内容数据
    var paramStr = $("#form").serialize();

    // 拼接图片的名称和图片
    // paramStr += '&key1=value1&key2=value2'
    paramStr += '&picName1='+ picArr[0].picName +'&picAddr1='+ picArr[0].picAddr;
    paramStr += '&picName2='+ picArr[1].picName +'&picAddr1='+ picArr[1].picAddr;
    paramStr += '&picName3='+ picArr[2].picName +'&picAddr1='+ picArr[2].picAddr;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramStr,
      dataType: 'json',
      success: function(info){
        //   console.log(info);
        if(info.success){
            // 关闭模态框
            $('#addModal').modal('hide');
            //重新渲染
            currentPage = 1;
            render();

            //重置
            $('#form').data('bootstrapValidator').resetForm(true);
            //由于下拉菜单和图片不是
            $('#dropdownText').text('请选择二级分类');
            // 删除图片的同时，清空数组
            $('#imgBox img').remove();
            picArr = [];
        }
      }
    });
  });
});
