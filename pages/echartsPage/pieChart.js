export const pieOpt = {
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  extra: {
    pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 15,
      border: false,
      borderWidth: 3,
      borderColor: '#FFFFFF',
    },
  },
}

export const pieData = {
  series: [
    {
      data: [
        { name: '一班', value: 50 },
        { name: '二班', value: 30 },
        { name: '三班', value: 20 },
        { name: '四班', value: 18 },
        { name: '五班', value: 8 },
      ],
    },
  ],
}
