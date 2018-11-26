$(function() {
  //1、获取地址栏传递的搜索关键字
  var key = getSearch("key");

  //2、赋值给input搜索框
  $(".search_input").val(key);

  // 3
  render();

  // 4、点击搜索按钮，重新发送请求
  $(".search_btn").click(function() {
    render();
  });

  // 5、点击排序的按钮，实现高亮效果
  $(".lt_sort a[data-type]").click(function() {
    if ($(this).hasClass("current")) {
      // 有current类,切换箭头的方向 fa-angle-down fa-angle-up
      $(this)
        .find("i")
        .toggleClass("fa-angle-down")
        .toggleClass("fa-angle-up");
      //重新渲染
      render();
    } else {
      $(this)
        .addClass("current")
        .siblings()
        .removeClass("current");
    }
  });

  //3、根据搜索关键字，发送ajax请求，获取数据，进行渲染
  function render() {

    // 在发送请求，重新渲染前，由于请求是需要时间的，所以这时候应该显示加载
    $('.lt_product').html('<div class="loading"></div>');

    var paramsObj = {};
    // 必须传递的参数
    paramsObj.proName = $(".search_input").val();
    paramsObj.page = 1;
    paramsObj.pageSize = 100;

    // 根据是否有高亮，a决定是否需要排序
    var $current = $(".lt_sort a.current");

    if ($current.length === 1) {
      // 有高亮a，需要额外传参
      console.log("需要传参");
      //  price  或者  num
      var sortName = $current.data("type");
      // 通过判断箭头的方向，来决定排序的值\
      // 如果有下箭头的类，降序； 否则是升序
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 添加到paramsObj参数中
      paramsObj[sortName] = sortValue;
    }

    console.log(paramsObj);

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: paramsObj,
        dataType: "json",
        success: function(info) {
          console.log(info);

          var htmlStr = template("searchTmp", info);
          $(".lt_product").html(htmlStr);
        }
      });
    }, 500);
  }
});
