<script setup>
	import { defineComponent, ref, defineProps } from 'vue';
	defineProps({
		title: {
			type: String,
			required: true
		}
	})
	const goBack = () => uni.navigateTo({ url: '/pages/index/index' })
	
</script>

<template name='mainHeader'>
	<view class="wrapper">
		<view @click="goBack" class="icon"> <uni-icons type="back" size="27"></uni-icons> </view>
		<view>{{ title }}</view>
	</view>
</template>

<style lang="scss">
.wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(44px + env(safe-area-inset-top));
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgb(248, 248, 248);
	.icon {
		position: absolute;
		left: 0;
		top: 0;
		width: 44px;
		height: 44px;
		line-height: 44px;
		text-align: center;
	}
}
</style>