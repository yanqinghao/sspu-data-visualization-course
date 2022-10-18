import { lineChartDemo, CATEGORIES } from '../common/constants'
import { throttle } from '../utils'

export default {

  // 组件名称 - 自定义，值要唯一
  name: lineChartDemo,

  // 前面板html模板
  viewTemplate() {
    return `
      <div data-gjs-type="${lineChartDemo}" class="${lineChartDemo}"></div>
    `
  },
  // 前面板html样式
  viewStyle() {
    return `
      <style>
        .${lineChartDemo} {
          position: absolute;
          border-radius: 5px;
          border-style: solid;
          border-width: 1px;
          border-color: transparent;
          padding: 10px;
          width: 600px;
          height: 400px;
        }
      </style>
    `
  },

  // 编辑器右侧块管理器中显示属性配置
  blockOptions() {
    return {
      category: CATEGORIES.ECHARTS, // 组件所属类别
      label: `
      <svg  class="gjs-block-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M408.533 425.173l256.64 213.76 333.44-455.68-34.56-25.173-306.56 418.987-255.36-212.907-248.32 315.947 33.707 26.453 221.013-281.387z" p-id="36183"></path><path d="M42.667 896V85.333H0v853.334h1024V896H42.667z" ></path></svg>
        <div class="gjs-block-label">线形图示例</div>
      `, // 前面板组件名称： 线形图示例
    };
  },

  // 后面板显示属性配置
  spOptions() {
    return {
      label: '线形图示例', // 后面板组件名称： 线形图示例
      icon: 'globe',
      docUrl: '',
      author: '', 
      email: '',
      // 输入桩
      inPorts: [{
        uuid: 'in1',
        subType: 'json',
        description: {
          zh_CN: '输入1'
        }
      }],
      // 输出桩
      outPorts: [{
        uuid: 'out1',
        subType: 'json',
        description: {
          zh_CN: '输出1'
        }
      }]
    }
  },

  // 组件属性
  componentOptions() {
    return {
      name: lineChartDemo,
      resizable: true,
      dmode: 'absolute',
      droppable: false,
      traits: [
        {
          name: 'isSoomth', // 配置key
          label: '是否平滑', // 右面板显示配置明知
          changeProp: 1, // 必填
          /**
           * type的值可为以下值：
           * · string：字符串，默认
           * · number：数值，可增加min，max字段来限制该配置区间
           * · checkbox：单选
           * · color：颜色选择器
           * · select：下拉菜单，当type为select时，需要增加options字段，
           *          例：options: [{ id: 'emptyCircle', name: '空心圆' }, { id: 'circle', name: '圆形' }]
           */
          type: 'checkbox', // checkbox为单选
        },
        { /** 默认数据配置 */
          name: 'csv',
          label: '示例数据',
          changeProp: 1,
          type: 'csvDownload',
          preFileName: '线形图',
          datas: [["name", "DEMO-1", "DEMO-2"], ["one", 1, 2], ["two", 2, 5], ["three", 3, 4], ["four", 4, 1], ["five", 5, 7]]
        }, {
          name: 'defaultData',
          changeProp: 1,
          type: 'hide'
        }
      ],
      isSoomth: false, // 上面traits里面的所有配置，都需要在这里增加默认值
      defaultData:JSON.stringify([
        ["name", "DEMO-1"], 
        ["one", 1], 
        ["two", 2], 
        ["three", -3], 
        ["four", 4], 
        ["five", 5]
      ]).replace(/\"/g, "\\\""),
    }
  },

  onModelScript() {
    const defaultData = JSON.parse('{[ defaultData ]}'.replace(/\\\"/g, "\""));
    const isSoomth = '{[ isSoomth ]}'; // 获取traits里面配置的值

    const self = this;
    const eventName = `call-` + self.getAttribute('id');
    const myChart = window.echarts.init(self);

    function initChart(dataSource) {
      if (!dataSource) return;
      myChart.clear();
      // 修改为新的echarts组件option
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value'
        },
        dataset: {
          source: dataSource,
        },
        series: [
          {
            type: 'line',
            // smooth: Boolean(isSoomth),
            areaStyle: {}
          }
        ]
      };
      myChart.setOption(option);
      myChart.resize();
    }

    initChart(defaultData);

    // 有 dashboardHost 说明是运行模式
    if (window.spSocket) {
      window.spSocket.subscribe({
        eventName: eventName,
        callback: function (_data) {
          let _in1Str = _data.data.in1; // 接收in1数据
          if (_in1Str) {
            const source = JSON.parse(_in1Str);

            initChart(source);
          }
        }
      });
    }
  },

  onViewInit() {
    this.updateScript();
    // traits里面的配置，都需在此处增加 “change:xxxx”才能监听到右面板配置改变
    const evn = `
      change:defaultData
      change:isSoomth
    `;
    this.listenTo(this.model, evn, this.updateScript);
    this.listenTo(this.model, evn, this.em.handleUpdates.bind(this.em));
    this.listenTo(this.em, 'update:component:style:height update:component:style:width', throttle.bind(this, this.updateScript.bind(this)));
  }
}
