export const radarOpt = {
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  padding: [5, 5, 5, 5],
  dataLabel: false,
  enableScroll: false,
  legend: {
    show: true,
    position: 'right',
    lineHeight: 25,
  },
  extra: {
    radar: {
      gridType: 'radar',
      gridColor: '#CCCCCC',
      gridCount: 3,
      opacity: 0.2,
      max: 200,
      labelShow: true,
      border: true,
    },
  },
}

export const radarData = {
  categories: ['维度1', '维度2', '维度3', '维度4', '维度5', '维度6'],
  series: [
    {
      name: '成交量1',
      data: [90, 110, 165, 195, 187, 172],
    },
    {
      name: '成交量2',
      data: [190, 210, 105, 35, 27, 102],
    },
  ],
}
