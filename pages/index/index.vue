<script setup>
	import { ref } from "vue";
	import { getIdentifyCode } from '@/util/api'
	import { useCounterStore } from "../../store/counter";
	const onClick = async () => {
		const res = await getIdentifyCode({})
		console.log(res)
	}
</script>

<template>
	<cell title="登录" is-link to="/pages/login/login" />
	<cell title="注册" is-link to="/pages/register/register"/>
	<cell title="canvas 测试" is-link to="/pages/canvas/canvas"/>
	<!-- {{ counter.count }} -->
	<!-- <button @click="counter.increment">加一</button> -->
	<!-- <button @click="onClick">click</button> -->
</template>

<style lang="scss">

</style>
