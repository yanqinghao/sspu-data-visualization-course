/**
 * 文字组件通用Traits
 */
export const textTraits = [{ 
  name: 'writingMode',
  label: '排列方式',
  changeProp: 1,
  type: 'select',
  options: [{ id: 'lr', name: '水平' }, { id: 'vertical-lr', name: '垂直' }]
}, {
  name: 'fontFamily',
  label: '特殊字体',
  changeProp: 1,
  type: 'select',
  options: ['inherit', 'DS-Digital', '庞门正道']
}];

export const textDefaultTraits = {
  "writingMode": 'lr',
  "fontFamily": 'inherit',
};

export const textDefaultListen = "change:writingMode change:fontFamily "

/**
 * 图表组件通用Traits
 */
export const echartsBasicTraits = [
  {
    name: 'dataSource',
    label: '数据源',
    changeProp: 1,
    placeholder: '请输入一个数据地址'
  }, {
    type: 'color',
    name: 'bgColor',
    label: '背景色',
    changeProp: 1,
  }, {
    type: 'color',
    name: 'borderColor',
    label: '边框颜色',
    changeProp: 1
  }, {
    type: 'color',
    name: 'fontColor',
    label: '字体颜色',
    changeProp: 1,
  }, {
    type: 'number',
    name: 'fontSize',
    label: '字号',
    changeProp: 1,
    min: 10,
    step: 1
  }, {
    name: 'colors',
    label: '图表色系',
    changeProp: 1,
  }, {
    name: 'titleText',
    label: '图表名称',
    changeProp: 1
  }, {
    name: 'titlePosition',
    label: '名称位置(左,上)',
    changeProp: 1
  }, {
    type: 'color',
    name: 'titleColor',
    label: '名称颜色',
    changeProp: 1
  }, {
    name: 'legendOrient',
    label: '图例',
    type: 'select',
    changeProp: 1,
    options: [{ id: 'null', name: '无' }, {id: 'horizontal', name: '水平'}, {id: 'vertical', name: '垂直'}]
  }, {
    name: 'legendPosition',
    label: '图例位置',
    changeProp: 1,
    type: 'key-value',
    maxLength: 2
  }, {
    name: 'legendMap',
    label: '图例映射',
    changeProp: 1,
  }, {
    name: 'legendFontSize',
    label: '图例字号',
    changeProp: 1,
    type: 'number',
    min: 8
  }, {
    name: 'legendFontFamily',
    label: '图例字体',
    changeProp: 1,
    type: 'select',
    options: [
      { id: 'sans-serif', name: '默认' },
      { id: '庞门正道', name: '庞门正道' },
      { id: 'DS-Digital', name: 'DS-Digital' }
    ]
  }, {
    name: 'legendItemGap',
    label: '图例间隔',
    changeProp: 1,
    type: 'number',
    min: 4
  }, {
    name: 'legendIcon',
    label: '图例标记类型',
    changeProp: 1,
    type: 'select',
    options: [
      { id: 'circle', name: '圆形' },
      { id: 'rect', name: '矩形' },
      { id: 'roundRect', name: '圆角矩形' },
      { id: 'triangle', name: '三角形' },
      { id: 'diamond', name: '菱形' },
      { id: 'pin', name: '大头针' },
      { id: 'arrow', name: '箭头' },
      { id: 'none', name: '无' },
    ]
  }, {
    name: 'legendItemWidth',
    label: '图例标记宽度',
    changeProp: 1,
    type: 'number',
    min: 4
  }, {
    name: 'legendItemHeight',
    label: '图例标记高度',
    changeProp: 1,
    type: 'number',
    min: 4
  }
];

export const BLUE_COLORS = ['#0084ff', '#339cff', '#66b5ff', '#99ceff', '#cce6ff']

export const echartsBasicDefaultTraits = {
  "dataSource": null,
  "bgColor": "none",
  "borderColor": "none",
  "fontColor": "#333333",
  "fontSize": 12,
  "colors": '#0084ff, #339cff, #66b5ff, #99ceff, #cce6ff',
  "titleText": "",
  "titleColor": null,
  "titlePosition": "left, top",
  "legendPosition": "left: center, bottom: auto",
  "legendOrient": "horizontal",
  'legendMap': null,
  "legendFontSize": 12,
  "legendFontFamily": "sans-serif",
  "legendIcon": "roundRect",
  "legendItemGap": 10,
  "legendItemWidth": 25,
  "legendItemHeight": 14
}

export const echartsBasicListen = "change:dataSource change:bgColor change:borderColor change:fontColor change:fontSize change:colors change:titleText change:titleColor change:titlePosition change:legendPosition change:legendOrient change:legendMap change:legendIcon change:legendItemGap change:legendItemWidth change:legendItemHeight change:legendFontSize change:legendFontFamily "
