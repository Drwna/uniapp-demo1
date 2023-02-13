<script setup>
	import { defineProps, defineEmits, defineComponent } from 'vue';

	defineComponent({ name: 'ProgressBar' })

	defineProps({
		progressBarVisible: {
			type: Boolean,
			required: true,
		},
		progress: {
			type: Number,
			required: true,
		},
		version: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
	})
	const emit = defineEmits(['update:progress', 'update:progressBarVisible'])
	const onClose = () => emit('update:progressBarVisible', false)

</script>

<template name="ProgressBar">
	<view v-if="progressBarVisible" class="wrapper">
		<view class="progress-bar">
			<view @click="onClose" class="progress-bar__close">
				<view class="close">
					<view class="close-line1"></view>
					<view class="close-line2"></view>
				</view>
			</view>
			<view class="progress-bar__title">升级至新版本 v{{ version }} </view>
			<view class="progress-bar__desc"> {{ desc }} </view>
			<view class="progress-bar__bar">
				<view class="progress-bar__bar__text">正在下载({{ progress }}%)</view>
				<view class="progress-bar__bar__inner" :style="{ width: `${progress}%` }"></view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.close {
		width: 100%;
		height: 100%;
		position: relative;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.4);

		[class^=close-line] {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 50%;
			height: 4rpx;
			background: #fff;
		}

	  &-line1 {
			transform: translate(-50%, -50%) rotate(45deg);
		}

		&-line2 {
			transform: translate(-50%, -50%) rotate(-45deg);
		}
	}

	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.5);

		.progress-bar {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 80%;
			background: #fff;
			border-radius: 20rpx;
			padding: 32rpx 30rpx;

			&__close {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: -4rpx;
				top: -90rpx;

				.icon {
					width: 56rpx;
					height: 56rpx;
				}
			}

			&__title {
				font-size: 40rpx;
				color: #333;
				margin-bottom: 30rpx;
			}

			&__desc {
				font-size: 24rpx;
				color: #787878;
				margin: 40rpx 0;
			}

			&__bar {
				font-size: 24rpx;
				color: #333;
				text-align: center;
				margin-bottom: 20rpx;
				position: relative;
				height: 80rpx;
				background: #9e9e9e;
				border-radius: 30rpx;

				&__text {
					color: #fff;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					line-height: 80rpx;
					z-index: 1;
				}

				&__inner {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					background: #000;
					border-radius: 30rpx;
				}
			}

			&__bar {
				position: relative;
				height: 80rpx;
				background: #9e9e9e;
				border-radius: 30rpx;

				&__inner {
					position: absolute;
					top: 0;
					left: 0;
					bottom: 0;
					background: #000;
					border-radius: 30rpx;
				}
			}
		}
	}
</style>
