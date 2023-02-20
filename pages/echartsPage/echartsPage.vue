<script setup>
import echart from '@/components/echart/echart.vue'
import { columnOpt, columnData } from './columnChart'
import { lineOpt, lineData } from './lineChart'
import { pieOpt, pieData } from './pieChart'
import { scatterOpt, scatterData } from './scatterChart'
import { radarOpt, radarData } from './radarChart'

</script>

<template>
  <echart title="柱状图" type="column" :opts="columnOpt" :data="columnData" />
  <echart title="折线图" type="line" :opts="lineOpt" :data="lineData" />
  <echart title="饼图" type="pie" :opts="pieOpt" :data="pieData" />
  <echart title="散点图" type="scatter" :opts="scatterOpt" :data="scatterData" />
  <echart title="雷达图" type="radar" :opts="radarOpt" :data="radarData" />
</template>

<style scoped>
</style>
