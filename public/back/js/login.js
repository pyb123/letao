// 表单校验

$(function() {
  $("#form").bootstrapValidator({
    // 配置小图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", //校验成功
      invalid: "glyphicon glyphicon-remove", //校验失败
      validating: "glyphicon glyphicon-refresh" //校验中
    },

    // 配置校验字段(配置之前，需要先配置input的name)
    fields: {
      // 配置用户名
      username: {
        // 配置校验规则
        validators: {
          // 非空
          notEmpty: {
            message: "用户名不能为空"
          },

          // 长度配置
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          },
          callback:{
            message: '用户名不存在'
          }
        }
      },
      // 配置密码
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度配置
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback:{
            message: '密码错误'
          }
        }
      }
    }
  });

  //   2-注册表单校验成功事件，在事件中阻止默认成功的表单提交，通过ajax提交

  $("#form").on("success.form.bv", function(e) {
    //   阻止默认的表单提交
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info) {
        //   console.log(info);
        if (info.success) {
          //
          location.href = "index.html";
        }
        if (info.error === 1000) {
          alert(info.message);
          // 用户名不存在
          // updateStatus('字段名称'，)
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    });
  });

  //   3-重置功能：本身reset按钮，可以重置内容，需要调用表单校验插件的方法
  $('[type="reset"]').click(function() {
    // resetForm
    // resetForm 如果传true，表示内容和状态都重置
    // 如果不传参，只重置状态
    $("#form")
      .data("bootstrapValidator")
      .resetForm();
  });
});
