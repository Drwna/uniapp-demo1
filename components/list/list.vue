<script setup>
import { ref, reactive, onMounted } from 'vue';

import tableDataRaw from './tableData.js'

const searchVal = ref('')
const tableData = reactive([])
// 每页数据量
const pageSize = ref(10)
// 当前页
const pageCurrent = ref(1)
// 数据总量
const total = ref(0)
const loading = ref(false)
const selectedIndexs = reactive([])

const selectedItems = () => {
  selectedIndexs.map(i => tableData[i])
}
// 多选
const selectionChange = e => {
  console.log(e.detail.index)
  selectedIndexs = e.detail.index
}
//批量删除
const delTable = () => {
  console.log(selectedItems())
}
// 分页触发
const change = e => {
  // this.$refs.table.clearSelection()
  selectedIndexs.length = 0
  getData(e.current)
}
// 搜索
const search = () => {
  getData(1, searchVal.value)
}

// 获取数据
const getData = (page, value = '') => {
  loading.value = true
  pageCurrent.value = page
  request({
    pageSize: pageSize,
    page: page,
    value: value,
    success: res => {
      // console.log('data', res);
      Object.assign(tableData, res.data)
      total.value = res.total
      loading.value = false
    },
  })
}

// 伪request请求
const request = options => {
  const { pageSize, page, success, value } = options
  console.log('request', options)
  let total = tableDataRaw.length
  // let data = tableDataRaw.filter((item, index) => {
  //   const idx = index - (page.value - 1) * pageSize.value
  //   return idx < pageSize.value && idx >= 0
  // })
  console.log(tableDataRaw)
  const data = tableDataRaw
  console.log('data', data)
  if (value.value) {
    data = []
    tableDataRaw.forEach(item => {
      if (item.name.indexOf(value) !== -1) {
        data.push(item)
      }
    })
    total = data.length
  }

  setTimeout(() => {
    typeof success === 'function' &&
      success({
        data: data,
        total: total,
      })
  }, 500)
}


onMounted(() => {
  console.log('get data')
  getData(1)
})



</script>

<template name="list">
  <view>
    <view class="uni-container">
      <uni-table ref="table" :loading="loading" class="uni-table"
        border stripe type="selection" emptyText="暂无更多数据"
        @selection-change="selectionChange">
        <uni-tr>
          <uni-th width="150" align="center">日期</uni-th>
          <uni-th width="150" align="center">姓名</uni-th>
          <uni-th width="204" align="center">设置</uni-th>
        </uni-tr>
        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td>{{ item.date }}</uni-td>
          <uni-td>
            <view class="name">{{ item.name }}</view>
          </uni-td>
          <uni-td>
            <view class="uni-group">
              <button class="uni-button" size="mini" type="primary">修改</button>
              <button class="uni-button" size="mini" type="warn">删除</button>
            </view>
          </uni-td>
        </uni-tr>
      </uni-table>
      <view class="uni-pagination-box">
        <uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
/* #ifndef H5 */
/* page {
	padding-top: 85px;
} */
/* #endif */
.uni-container {
}
.uni-group {
  display: flex;
  align-items: center;
  .uni-table {
    border: 1px solid red;
  }
}
</style>
