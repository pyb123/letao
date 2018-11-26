$(function(){

    // 功能1.用户个人信息渲染（需要当前用户登录）
        // 发送个人信息的请求，会有两种响应
            // （1）当前用户未登录，响应error
            // 当前用户已登录，响应当前用户的信息
    $.ajax({
        type: 'get',
        url:'/user/queryUserMessage',
        dataType: 'json',
        success: function(info){
            console.log(info);
            if(info.error === 400){
                // 未登录
                location.href = 'login.html';
                return;
            }

            // 说明当前用户已登录，并且info就是个人信息
            var htmlStr = template('tpl',info);
            $('#userInfo').html(htmlStr);
            
        }
    })

    // 2.退出功能
    $('#logout').click(function(){
        $.ajax({
            type: 'get',
            url: '/user/logout',
            dataType: 'json',
            success: function(info){
                if(info.success){
                    // 成功
                    location.href = 'login.html';
                }
            }
        })
    })
})