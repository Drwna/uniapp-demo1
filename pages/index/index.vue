<script setup>
	import { getIdentifyCode } from '@/util/api'
	import { useCounterStore } from "@/store/counter"
	import { useAppInfoStore } from "@/store/appInfo"
	import { onLaunch } from '@dcloudio/uni-app'
	import ProgressBar from "@/components/progressBar/progressBar.vue"

	const onClick = async () => {
		const res = await getIdentifyCode({})
		console.log(res)
	}
	const appInfo = useAppInfoStore()
	const goMainPage = () => uni.switchTab({url: '/pages/mainPage/mainPage'}) 
	const goArtPage = () => uni.switchTab({url: '/pages/ArtPage/ArtPage'}) 

</script>

<template>
	<cell title="主界面" is-link :go="goMainPage" />
	<cell title="主界面(art)" is-link :go="goArtPage" />
	<cell title="手机号注册及登录" is-link to="/pages/phone/phone" />
	<cell title="邮箱注册及登录" is-link to="/pages/email/email"  />
	<cell title="列表" is-link to="/pages/listPage/listPage"/>
	<!-- <cell title="canvas 测试" is-link to="/pages/canvas/canvas"/> -->
	<!-- #ifdef H5 -->
	<view style="margin:20rpx;">当前版本：{{ appInfo.newestVersion }}</view>
	<!-- #endif -->
	<!-- <view style="margin:20rpx; display: none;">最新版本：{{ appInfo.newestVersion }}</view> -->
	<!-- #ifdef APP-PLUS -->
	<view style="margin:20rpx;">当前版本：{{ appInfo.currentVersion }}</view>
	<ProgressBar 
		v-model:progressBarVisible="appInfo.upgradeState.isLoading" 
		v-model:progress="appInfo.upgradeState.percent"
		:version="appInfo.newestVersion"
		:desc="appInfo.upgradeState.desc"
	/>
	<!-- #endif -->

	<!-- {{ counter.count }} -->
	<!-- <button @click="counter.increment">加一</button> -->
	<!-- <button @click="onClick">click</button> -->
</template>

<style lang="scss">

</style>
