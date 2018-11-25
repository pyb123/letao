// 功能1： 本地历史记录渲染展示
// 功能2： 清空所有历史记录
// 功能3： 删除单条历史记录

// 由于整个页面都在进行本地历史记录的操作，所有约定键名search_list
/*
  存储在本地的假数据：
    var arr = ['耐克','阿迪','阿迪王','老北京']
    var jsonStr = JSON.stringify(arr)
    localStorage.setItem('search_list',jsonStr)

*/

// var arr = ['耐克','阿迪','阿迪王','老北京']

$(function() {
    // 功能1： 本地历史记录渲染展示
      // 思路：
      // 1-从本地读取搜索记录
      // 2-读出来的是jsonStr，转换成数组
      // 3-结合模板引擎进行渲染
    render();

  // 获取本地历史记录数组
  function getHistory() {
    // 对没有数据时，进行默认值处理
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(jsonStr); // 转成数组
    return arr;
  }

  // 读取本地历史数组，并根据数据进行渲染
  function render(){
    var arr = getHistory();
    // 结合模板引擎渲染
    var htmlStr = template("searchTmp", { list: arr });
    $(".lt_history").html(htmlStr);
  }

  // 功能2：
  // 1-给清空记录添加点击事件（事件委托）
  // 2-利用removeItem清空所有的历史记录
  // 3-重新渲染页面
  $('.lt_history').on('click','.btn-empty',function(){
    //   mui.confirm('确认框文本内容'，'大标题','按钮文本的数组','对话框关闭的回调函数')

      mui.confirm('你确定要删除清空记录吗？','温馨提示',['取消','确认'],function(e){
        // console.log('确认框');
        if(e.index === 1){
          localStorage.removeItem('search_list');
          render();
        }
      })
  });

  // 功能3： 删除单条历史记录
    // 1.给所有的删除按钮，添加点击事件（事件委托）
    // 2.获取下标，将数组的对应项删除
    // 3.将数组转成json字符串 存储到本地存储中
    // 4.重新渲染
    $('.lt_history').on('click','.btn_delete',function(){
        // 获取下标
        var index = $(this).data('index');
        // 获取数组
        var arr = getHistory();
        // 根据下标，删除数组的对应项
        // arr.splice(开始下标，删除几个，替换项1,替换项2...) ===> 会改变原数组
        arr.splice(index,1);

        // 数组转成json字符串 存储到本地存储中
        localStorage.setItem('search_list',JSON.stringify(arr));

        // 重新渲染 
        render();


    });

    // 功能4：添加历史记录
      // 1-给搜索按钮，添加点击事件
      // 2-获取搜素关键字，添加到数组的最前面
      // 3-将数组转成jsonStr，存储到本地存储中
      // 4-重新渲染
    $('.search_btn').click(function(){
        // 获取搜素关键字
        var key = $('.search_input').val().trim();

        // 非空处理
        if(key === ''){
          mui.toast('请输入搜索关键字');
          return;
        }

        // 获取数组
        var arr = getHistory();
        
        // 如果已经有了重复项，将重复项删除
        var index = arr.indexOf(key);
        if(index != -1){
          // 有重复向，将重复项删除
          arr.splice(index,1);
        }

        // 如果长度超过10个，删除最后一个
        if(arr.length >= 10){
          arr.pop();
          
        }


        // 添加到数组的最前面
        arr.unshift( key );

        // 将数组转成jsonStr，存储到本地存储中
        localStorage.setItem('search_list',JSON.stringify(arr));

        // 重新渲染
        render();

        // 清空搜素框内容
        $('.search_input').val('');

        //跳转到商品列表页
        location.href = 'search_list.html?key='+key;

    });
});
