<script setup>
import { useSlots, ref, onMounted, defineEmits } from 'vue'
import tab from './tab.vue'

const props = defineProps({
	activeTitle: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: 'red'
	}
})

const emit = defineEmits(['update:activeTitle'])
const slots = useSlots()
const slotList = slots.default()
slotList.forEach(c => {
	if(c?.type !== tab) {
		console.error('tabs 组件只能包含 tab 组件，注释也不例外！)')
	}
})

const titleList = slotList.map(c => {
	// 判断 name 是否包含空格
	if(c.props.title.includes(' ')) {
		console.error(`tabs 组件中的 tab 组件的 name 属性不能包含空格，有空格的 name 为 ${c.props.title}`)
	}
	return c.props.title
})
if(new Set(titleList).size !== titleList.length) {
	const duplicateTitle = titleList.filter((v, i, arr) => arr.indexOf(v) !== i)
	console.error(`tabs 组件中的 tab 子组件的 title 属性不能重复，重复的 title 为 ${duplicateTitle}。`)
}
// 或者使用双重循环判断是否有重复的 name
// for(let i = 0; i < titleList.length; i++) {
// 	for(let j = i + 1; j < titleList.length; j++) {
// 		if(titleList[i] === titleList[j]) {
// 			console.error(`tabs 组件中的 tab 组件的 name 属性不能重复，重复的 name 为 ${titleList[i]}`)
// 			break;
// 		}
// 	}
// }

// title 与 index 的映射，用于计算指示器位置 例：{a: 0, b: 1, c: 2}
const titleMapIndex = slotList.reduce((acc, cur, index) => {
	acc[cur.props.title] = index
	return acc
}, {})
// title 与 name 的映射，用于显示 name 例：{a: 'aaa', b: 'bbb', c: 'ccc'}
const titleMapName = slotList.reduce((acc, cur) => {
	acc[cur.props.title] = cur.props.name
	return acc
}, {})

// 指示器位置
const indicatorLeft = ref('0px')
// 滑动切换后触发
const swiperChange = (event) => updateView(event.detail.currentItemId)
// 点击标签切换后触发
const clickChange = (itemId) => updateView(itemId)
// 更新视图
const updateView = (itemId) => {
	if(itemId === props.activeTitle) return
	emit('update:activeTitle', itemId)
	setIndicator2(itemId)
}
// 设置指示器位置

// 设置指示器位置
// const setIndicator = (itemId) => {
// 	const index = nameMapIndex[itemId]
// 	const query = uni.createSelectorQuery()
// 	const arr = [`#${itemId}`, '#indicator']
// 	for(let i = 0; i < arr.length; i++) {
// 		query.select(arr[i]).boundingClientRect()
// 	}
// 	let left, itemCenterPoint, centerPoint, indicatorWidth
// 	query.exec(
// 		(res) => {
// 			res.forEach(v => {
// 				if(v.id === 'indicator' ){
// 					indicatorWidth = v.width
// 				} else {
// 					left = v.width * index
// 					itemCenterPoint = left + v.width / 2
// 				}
// 			})
// 			centerPoint = itemCenterPoint - indicatorWidth / 2
// 			indicatorLeft.value = `${centerPoint}px`
// 		}
// 	)
// }

const setIndicator2 = currentItemId => {
	const itemIdList = titleList.map(v => `#${v}`)
	const query = uni.createSelectorQuery()
	for(let i = 0; i < itemIdList.length; i++) {
		query.select(itemIdList[i]).boundingClientRect()
	}
	query.select('#indicator').boundingClientRect()
	let left = 0, cutItemCenterPoint, centerPoint, indicatorWidth, cutItemWidth
	const cutItemIndex = titleMapIndex[currentItemId]
	query.exec(
		(res) => {
			res.forEach(v => {
				if(v.id === 'indicator') {
					indicatorWidth = v.width
				} else if( titleMapIndex[v.id] < cutItemIndex) {
					left += v.width
				}
				if(v.id === currentItemId) {
					cutItemWidth = v.width
				}
			})
			console.log(cutItemWidth)
			cutItemCenterPoint = left + cutItemWidth / 2
			centerPoint = cutItemCenterPoint - indicatorWidth / 2
			indicatorLeft.value = `${centerPoint}px`
		}
	)
}

onMounted(() => {
	if(!titleList.includes(props.activeTitle) ||
		props.activeTitle === undefined) {
		emit('update:activeTitle', titleList[0])
		setIndicator2(titleList[0])
	} else {
		setIndicator2(props.activeTitle)
	}
})

</script>

<template name="tabs">
  <view class="tabs">
		
		<view class="scroll-view-wrapper">
			<scroll-view 
				class="scroll-view" :scroll-x="true" :scroll-into-view="activeTitle" >
					<view v-for="title in titleList" :key="title" :id="title" 
					:class="{active: activeTitle === title}" class="scroll-view-item"
					@click="clickChange(title)">
					{{ titleMapName[title] }}
					</view>
			</scroll-view>
			<view id="indicator" class="indicator"></view>
		</view>

		<view>
			<swiper class="swiper" :current-item-id="activeTitle" @change="swiperChange">
				<swiper-item v-for="comp in slotList" class="swiper-item"
						:key="comp.props.title" :item-id="comp.props.title" :id="comp.props.title">
						<component :is="comp" :key="comp.props.title" />
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<style lang="scss">
.tabs {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 4rpx;
	.scroll-view-wrapper {
		width: 100%;
		position: relative;
		overflow: auto;
		& ::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
		}
		.indicator {
			position: absolute;
			display: inline-block;
			height: 2px;
			width: 100rpx;
			bottom: 0;
			transition: 250ms;
			transform: translateX(v-bind(indicatorLeft));
			background-color: v-bind(color);
			border-radius: 0 0 2rpx 2rpx;
		}
		.scroll-view {
			width: 100%;
			white-space: nowrap;
			position: relative;
			:deep(.uni-scroll-view-content) {
				display: flex;
			}
			&-item {
				flex-grow: 1;
				flex-shrink: 0;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				width: auto;
				min-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				&.active {
					color: v-bind(color);
				}
			}
		}
	}

	.swiper {
		border: 1px solid red;
		&-item {
		}
	}
}
	
</style>
