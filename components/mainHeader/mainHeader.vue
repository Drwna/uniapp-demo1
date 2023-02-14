<script setup>
	import { ref, defineProps, onMounted } from 'vue'
	defineProps({
		title: {
			type: String,
			required: true
		}
	})
	const goBack = () => uni.navigateTo({ url: '/pages/index/index' })
	const getHeaderHeight = () => {
		return new Promise((resolve, reject) => {
			const query = uni.createSelectorQuery()
			query.select('#header').boundingClientRect( rect => {
				resolve(`${rect.height}px`)
			}).exec()
		})
	}
	defineExpose({ getHeaderHeight })

</script>

<template name='mainHeader'>
	<view id="header" class="wrapper">
		<view class="status_bar"> <!-- 这里是状态栏 --> </view>
		<view class="top-bar">
			<view @click="goBack" class="icon"> <uni-icons type="back" size="27"></uni-icons> </view>
			<view class="txt">{{ title }}</view>
			<view class="icon faker"> <uni-icons type="back" size="27"></uni-icons> </view>
		</view>
	</view>
</template>

<style lang="scss">
.wrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: #fff;
	}
	.top-bar {
		height: 44px;
		height: calc(44px + constant(safe-area-inset-top));
		height: calc(44px + env(safe-area-inset-top));
		padding: 0 8px;
		padding-top: calc(7px + constant(safe-area-inset-top));
		padding-top: calc(7px + env(safe-area-inset-top));
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgb(248, 248, 248);
		.txt {
			font-weight: bold;
		}
		.icon {
			&.faker {
				opacity: 0;
			}
		}
	}
}
</style>