<script setup>
	import { ref } from "vue";
	import { getIdentifyCode } from '@/util/api'
	import { useCounterStore } from "../../store/counter";
	import { useAppInfoStore } from "../../store/appInfo";
	import { onLaunch } from '@dcloudio/uni-app'

	const onClick = async () => {
		const res = await getIdentifyCode({})
		console.log(res)
	}
	const appInfo = useAppInfoStore()

</script>

<template>
	<cell title="登录" is-link to="/pages/login/login" />
	<cell title="注册" is-link to="/pages/register/register"/>
	<cell title="canvas 测试" is-link to="/pages/canvas/canvas"/>
	<view style="margin:20rpx;">当前版本：{{ appInfo.currentVersion }}</view>
	<view style="margin:20rpx;">最新版本：{{ appInfo.newestVersion }}</view>
	<view>hello</view>
	<!-- {{ counter.count }} -->
	<!-- <button @click="counter.increment">加一</button> -->
	<!-- <button @click="onClick">click</button> -->
</template>

<style lang="scss">

</style>
