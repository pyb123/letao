$(function(){
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function(info){
            // console.log(info);

            var htmlStr = template('leftTpm',info);
            $('.lt_category_left ul').html(htmlStr);

            renderById(info.rows[0].id);
        }
    });


    // 给左侧所有a添加点击事件（通过事件委托）
    $('.lt_category_left').on('click','a',function(){
        // 排他
        $('.lt_category_left a').removeClass('current');
        $(this).addClass('current');

        //获取id，调用方法，渲染二级分类
        var id = $(this).data('id');
        renderById(id);
    })


    // 根据一级分类id，动态渲染右侧二级分类
    function renderById(id){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(info){
                console.log(info);

                // 通过模板引擎渲染
                var htmlStr = template('rightTpm',info);
                $('.lt_category_right ul').html(htmlStr);
            }

        })
    }
})