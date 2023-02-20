export const lineOpt = {
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true,
  },
  yAxis: {
    gridType: 'dash',
    dashLength: 2,
  },
  extra: {
    line: {
      type: 'straight',
      width: 2,
      activeType: 'hollow',
    },
  },
}

export const lineData = {
  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
  series: [
    {
      name: '成交量A',
      data: [35, 8, 25, 37, 4, 20],
    },
    {
      name: '成交量B',
      data: [70, 40, 65, 100, 44, 68],
    },
    {
      name: '成交量C',
      data: [100, 80, 95, 150, 112, 132],
    },
  ],
}
