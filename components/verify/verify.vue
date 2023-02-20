<script setup>
	import { nextTick, ref, computed, watch, defineComponent } from 'vue'
	import { getIdentifyCode } from '@/util/api.js'
	import { blurBg2 } from '@/util'
	import { onShow, onReady } from '@dcloudio/uni-app'

	defineComponent({ name: 'verify' })
	const props = defineProps({
		phoneOrEmail: {
			type: String,
			required: true
		},
		modelValue: {
			type: Boolean,
			default: false,
		},
	})
	const emit = defineEmits(['onConfirm', 'update:modelValue'])

	const firstVisible = ref(false)
	const bg = ref('')
	const popup = ref()
	const canvas = ref()
	const idiomString = ref('')
	const idiomArray = ref([])
	const showPopup = computed({
		set(value) {
			emit('update:modelValue', value);
		},
		get() {
			return props.modelValue;
		},
	})
	const idiom = computed(() => idiomArray.value.map((w) => w.slice(0, 1)).join(''))
	const open = () => popup.value.open()
	const close = () => {
		firstVisible.value = true
		popup.value.close()
		showPopup.value = false
	}
	const onSelect = (e) => {
		const target = e.target.dataset.word
		if (!target) return
		const index = idiomArray.value.indexOf(target)
		if (index >= 0) {
			idiomArray.value.splice(index, 1)
			return
		}
		idiomArray.value.push(target)
	}
	const refresh = () => {
		idiomArray.value = []
		setWord()
		blurBg2('canvasBg')
	}
	const onConfirm = () => {
		if (idiomArray.value.length >= idiomString.value.length) {
			emit('onConfirm', idiom.value)
		} else {
			uni.showToast({
				title: '请排列好文字!',
				icon: 'error',
				duration: 2000
			})
		}
	}
	const setWord = async () => {
		console.log('set word')
		const response = await getIdentifyCode({
			mobilePhoneNo: props.phoneOrEmail
		})
		idiomString.value = response.rtnObj1
	}
	watch(showPopup, async (val, oldVal) => {
		if (val) {
			open()
			nextTick(() => {
				blurBg2('canvasBg')
			})
			if(firstVisible.value === false) {
				setWord()
			}
		} else {
			close()
		}
	})


</script>

<template>
	<uni-popup ref="popup" type="center" @maskClick="close">
		<uni-card class="box">
			<template v-slot:title>
				<h3 class="title">
					请点击文字，排列成正确的顺序
					<uni-icons @click="close" class="icon" type="closeempty" size="20"></uni-icons>
				</h3>
			</template>
			<view class="refresh">
				<text class="word">{{idiom}}</text>
				<button @click="refresh" class="mini-btn" type="primary" size="mini">刷新</button>
			</view>
			<view class="words-wrapper">
				<!-- #ifdef APP-PLUS -->
				<canvas :key="Math.random()" ref="canvas" class="canvas" canvas-id="canvasBg" id="canvasBg"></canvas>
				<!-- #endif-->
				<!-- #ifdef H5 -->
				<canvas ref="canvas" class="canvas" canvas-id="canvasBg" id="canvasBg"></canvas>
				<!-- #endif -->
				<view class="words" :style="{backgroundImage: `url(${bg})`}">
					<view @click="onSelect" v-for="(word, index) in idiomString" :key="word + index"
						:data-word="word + index" :class="{ selected: idiomArray.includes(word + index) }" class="word">
						{{ word }}
					</view>
				</view>
			</view>
			<button @click="onConfirm" type="primary">确认</button>
		</uni-card>
	</uni-popup>
</template>

<style lang="scss">
	.box {
		width: 640rpx;
		background-color: #fff;

		.title {
			padding: 50rpx 0 0 0;
			text-align: center;
			font-size: 34rpx;
			position: relative;

			.icon {
				position: absolute;
				right: 0;
				transform: translateY(-60%);
			}
		}

		.refresh {
			text-align: right;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.word {
				flex-grow: 1;
				text-align: center;
				font-size: 34rpx;
				color: #990505;
			}
		}

		.words-wrapper {
			width: 100%;
			height: 300rpx;
			margin: 20rpx 0;
			position: relative;

			.words {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;
			}

			.canvas {
				position: absolute;
				width: 100%;
				height: 100%;
				// transform: translate(200%, 200%);
			}

			.word {
				font-size: 56rpx;
				padding: 10rpx;
				color: #000;
				z-index: 1;
				&.selected {
					color: #fff;
					background-color: #999999;
				}
			}
		}
	}
</style>
