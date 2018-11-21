$(function() {

// 左侧柱状图
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector('.echarts_left'));

  // 指定图表的配置项和数据
  var option = {
    // 大标题
    title: {
      // 标题文本
      text: "2018年注册人数"
    },
    // 提示框组件
    tooltip: {},
    legend: {
      // 图例
      data: ["人数",'销量']
    },
    // x轴
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    // y轴
    yAxis: {},
    series: [
      {
        name: "人数",
        // bar：表示柱状图  line：表示折线图  pie：饼图
        // 柱状图和折线图可以快速转换，饼图不可以
        type: "bar",
        data: [405, 500, 306, 600, 700, 200]
      },
      {
        name: "销量",
        type: "bar",
        data: [500, 200, 360, 100, 100, 200]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);





// 右侧的饼图
   // 基于准备好的dom，初始化echarts实例
   var echarts_right = echarts.init(document.querySelector('.echarts_right'));

   // 指定图表的配置项和数据
   var option2 =  {
    //  大标题
    title : {
      // 主标题
        text: '热门品牌销售',
        // 副标题
        subtext: '2018年11月',
        // 控制水平方向的位置
        x:'center',
        // 主标题样式
        textStyle:{
          fontSize: 25,
          color: '#e92322'
        }
    },
    // 提示框组件
    tooltip : {
      // 表示鼠标悬停在item上时触发
        trigger: 'item',
        // {a}（系列series名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // 横纵方向  vertical：垂直   horizontal：水平
        orient: 'vertical',
        // 控制水平位置
        left: 'left',
        data: ['耐克','阿迪王','老北京','阿迪','361']
    },
    // 系列列表
    series : [
        {
            name: '热门品牌',  //系列名称
            // 类型
            type: 'pie',
            // 控制圆的大小，直径的大小，百分比相对于当前容器
            radius : '55%',
            // 圆心的坐标
            center: ['50%', '60%'],
            // 数据项
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪王'},
                {value:234, name:'老北京'},
                {value:135, name:'阿迪'},
                {value:1548, name:'361'}
            ],
            // 控制额外的阴影效果
            itemStyle: {
                emphasis: {
                  // 模糊度
                    shadowBlur: 10,
                    // 偏移值
                    shadowOffsetX: 0,
                    // 颜色
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

 
   // 使用刚指定的配置项和数据显示图表。
   echarts_right.setOption(option2);
});
