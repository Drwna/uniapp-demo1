<script setup>
import { getCurrentInstance, ref, reactive, computed, watch, watchEffect } from 'vue';
const navList = reactive([
  {
    name: '首页',
    url: '/pages/mainPage/mainPage',
    icon: 'home'
  },
  {
    name: '分类',
    url: '/pages/category/category',
    icon: 'home'
  },
  {
    name: '图表',
    url: '/pages/charts/charts',
    icon: 'home'
  },
  {
    name: '我的',
    url: '/pages/person/person',
    icon: 'home'
  }
])

const onClick = (url) => {
  uni.navigateTo({ url })
}

const currentRoute = computed(() => {
  console.log('getCurrentPages')
  const route = getCurrentPages()
  const path = route[0].route
  return path.split('/').pop()
})

const activeClass = (url) => {
  const route = url.split('/').pop()
  return route === currentRoute.value ? true : false
}

const activeIcon = (url, icon) => {
  const route = url.split('/').pop()
  return route === currentRoute.value ? `${icon}-filled` : icon
}

const cutRoute = getCurrentPages()?.[0].route.split('/').pop()
console.log(cutRoute)


const cutRouteName = ref('')

</script>

<template name="mainNav">
  <nav class="nav">
    <view v-for="{name, url, icon} in navList" :key="name" @click="onClick(url)" class="item" 
      :class="{active: activeClass(url)}" >
      <uni-icons :type="activeIcon(url, icon)" size="34"></uni-icons>
      <text>{{ name }}</text>
    </view>
    <!-- <view @click="onClick('/pages/login/login')" class="item">
      <uni-icons type="contact" size="34"></uni-icons>
      <text>首页</text>
    </view> -->
    <!-- <view @click="onClick('/pages/register/register')" class="item">
      <uni-icons type="contact" size="34"></uni-icons>
      <text>分类</text>
    </view>
    <view @click="onClick('/pages/login/login')" class="item">
      <uni-icons type="contact" size="34"></uni-icons>
      <text>图表</text>
    </view>
    <view @click="onClick('/pages/login/login')" class="item">
      <uni-icons type="contact" size="34"></uni-icons>
      <text>我的</text>
    </view> -->
  </nav>
</template>

<style lang="scss">
  .nav {
    display: flex;
    > .item {
      flex: 1;
      font-size: 28rpx;
      color: #707070;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8rpx;
      padding: 12rpx 0;
      &.active {
        color: #4243e8;
        .uni-icons {
          color: #4243e8 !important;
        }
      }
    }
  }
</style>
