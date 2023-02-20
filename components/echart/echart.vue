<script setup>
import { reactive } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: true
  },
  opts: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const data = reactive({})
const opts = reactive({})

const getServerData = () => {
  setTimeout(() => {
    Object.assign(data, props.data)
    Object.assign(opts, props.opts)
  }, 500)
}

getServerData()

</script>

<template>
  <view class="charts-box">
    <h2>{{ title }}</h2>
    <qiun-data-charts :type="type" :opts="opts" :chartData="data" />
  </view>
</template>

<style lang="scss" scoped>
.charts-box {
  padding-top: 50rpx;
  width: 100%;
  // height: 300px;
  h2 {
    text-align: center;
    font-size: 40rpx;
  }
}
</style>
