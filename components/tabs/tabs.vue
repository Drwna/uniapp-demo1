<script setup>
import { useSlots, ref, reactive, onMounted, defineEmits, computed } from 'vue';
import tab from './tab.vue';

const navList = reactive([
	{
		id: 'item-01',
		name: '选项一'
	},
	{
		id: 'item-02',
		name: '选项二'
	},
	// {
	// 	id: 'item-03',
	// 	name: '选项三'
	// },
	// {
	// 	id: 'item-04',
	// 	name: '选项四'
	// },
	// {
	// 	id: 'item05',
	// 	name: 'E'
	// },
	{
		id: 'item-06',
		name: 'F'
	}
])

const props = defineProps({
	active: {
		type: String,
		required: true
	}
})
const emit = defineEmits(['update:active'])
const slots = useSlots()
const slotList = slots.default()
slotList.forEach(c => {
	if(c?.type !== tab) {
		console.error('tabs 组件只能包含 tab 组件')
	}
})
const nameList = slotList.map(c => c.props.name)
const nameMapIndex = slotList.reduce((acc, cur, index) => {
	acc[cur.props.name] = index
	return acc
}, {})



// 指示器位置
const indicatorLeft = ref('0px')
// 滑动切换后触发
const swiperChange = (event) => {
	const { currentItemId: itemId } = event.detail
	updateView(itemId)
}
// 点击标签切换后触发
const changeCurrentItemId = (itemId) => {
	updateView(itemId)
} 
// 更新视图
const updateView = (itemId) => {
	emit('update:active', itemId)
	setIndicator(itemId)
}

// 设置指示器位置
const setIndicator = (itemId) => {
	const index = nameMapIndex[itemId]
	const query = uni.createSelectorQuery()
	const arr = [`#${itemId}`, '#indicator']
	for(let i = 0; i < arr.length; i++) {
		query.select(arr[i]).boundingClientRect()
	}
	let left, itemCenterPoint, centerPoint, indicatorWidth
	query.exec(
		(res) => {
			res.forEach(v => {
				if(v.id === 'indicator' ){
					indicatorWidth = v.width
				} else {
					left = v.width * index
					itemCenterPoint = left + v.width / 2
				}
			})
			centerPoint = itemCenterPoint - indicatorWidth / 2
			indicatorLeft.value = `${centerPoint}px`
		}
	)
}

onMounted(() => {
	setIndicator(props.active)
})

</script>

<template name="tabs">
  <view class="tabs">
		
		<view class="scroll-view-wrapper">
			<scroll-view 
				class="scroll-view" 
				:scroll-x="true" 
				:scroll-into-view="active" >
					<view v-for="name in nameList" :key="name" :id="name" 
					:class="{active: active === name}" class="scroll-view-item"
					@click="changeCurrentItemId(name)" >
					{{ name }}
					</view>
					<view id="indicator" class="indicator"></view>
			</scroll-view>
		</view>

		<view>
			<swiper class="swiper" :current-item-id="active" @change="swiperChange">
				<swiper-item v-for="comp in slotList" class="swiper-item"
						:key="comp.props.name" :item-id="comp.props.name" :id="comp.props.name">
						<component :is="comp" :key="comp.props.name" />
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
	}
	.scroll-view-wrapper {
		width: 100%;
		// overflow: auto;
		// border: 1px solid red;

		& ::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
		}
		.scroll-view {
			width: 100%;
			white-space: nowrap;
			position: relative;
			:deep(.uni-scroll-view-content){
				display: flex;
			}
			.indicator {
				position: absolute;
				display: inline-block;
				height: 2px;
				width: 100rpx;
				bottom: 0;
				transition: 250ms;
				transform: translateX(v-bind(indicatorLeft));
				background-color: red;
				// border-radius: 2rpx;
				border-radius: 0 0 2rpx 2rpx;
			}
			&-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 20rpx 60rpx;
				text-align: center;
				font-size: 36rpx;
				&.active {
					color: red;
				}
			}
		}
	}

	.swiper {
		height: 300rpx;
		&-item {
		}
	}

	
</style>
