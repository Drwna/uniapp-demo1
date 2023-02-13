<script setup>
	import {
		defineComponent,
		ref,
		useAttrs
	} from 'vue'

	defineComponent({
		name: 'cell'
	})
	const props = defineProps({
		title: {
			type: String,
			required: true
		},
		to: {
			type: String
		},
		go: {
			type: Function
		}
	})
	const $attrs = useAttrs()
	const onClick = () => {
		if(props?.go){
			props.go()
			return
		}
		const hasIsLink = Object.keys($attrs).some(v => ['is-Link', 'isLink', 'is-link'].includes(v))
		if (hasIsLink) {
			if (!props.to) {
				console.error('Missing required prop: [to]')
				return
			}
			uni.navigateTo({ url: props.to })
		}
	}
</script>

<template name='cell'>
	<view class="cell" @click="onClick">
		<view class="title"> {{title}} </view>
		<view class="triangle"><i class="arrow right"></i></view>
	</view>
</template>

<style lang="scss">
	.cell {
		display: flex;
		justify-content: space-between;
		margin: 8rpx 20rpx;
		padding: 10px 0;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.2);
	}

	.triangle {
		display: inline-block;

		.arrow {
			border: solid rgba(0, 0, 0, 0.5);
			border-width: 0 4rpx 4rpx 0;
			display: inline-block;
			padding: 8rpx;
		}

		.right {
			transform: translateX(-100%) rotate(-45deg);
		}
	}
</style>
