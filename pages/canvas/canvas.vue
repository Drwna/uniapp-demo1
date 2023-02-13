<script setup>
	import { ref, computed } from "vue"
	import { onReady } from '@dcloudio/uni-app'
	import { blurBg2 } from "@/util"
	import ProgressBar from '@/components/progressBar/progressBar.vue'


	onReady(()=>{ blurBg2('canvasBg') })

	const canvas = ref()
	const idiomString = ref()
	const idiomArray = ref([])
	const idiom = computed(() => idiomArray.value.map((w) => w.slice(0, 1)).join(''))
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
	setTimeout(() => {
		idiomString.value = '新年快乐'
	})

	const refresh = () => {
		idiomArray.value = []
		idiomString.value = '津津乐道'
		blurBg2('canvasBg')
	}
	const progressBarVisible = ref(false)

</script>

<template name="canvasTest">
	<view class="box">
		{{ idiom }}
		{{ idiomArray }}
		<view class="words-wrapper">
			<!-- #ifdef APP-PLUS -->
			<canvas :key="Math.random()" ref="canvas" class="canvas" canvas-id="canvasBg" id="canvasBg"></canvas>
			<!-- #endif-->
			<!-- #ifdef H5 -->
			<canvas ref="canvas" class="canvas" canvas-id="canvasBg" id="canvasBg"></canvas>
			<!-- #endif -->
			<view class="words">
				<view @click="onSelect" v-for="(word, index) in idiomString" :key="word + index"
					:data-word="word + index" :class="{ selected: idiomArray.includes(word + index) }" class="word">
					{{ word }}
				</view>
			</view>
		</view>
		<button @click="refresh">刷新</button>
		<button @click="progressBarVisible = !progressBarVisible">打开 进度条</button>
		<ProgressBar v-model:progressBarVisible="progressBarVisible" />
	</view>
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
				border: 1px solid red;
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
</style>
