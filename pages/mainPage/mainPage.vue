<script setup>
import layout from '@/components/layout/layout.vue';
import tabs from '@/components/tabs/tabs.vue';
import tab from '@/components/tabs/tab.vue';
import { ref } from 'vue';

const activeTitle = ref('')
const scroll = () => {
	console.log('scroll')
}

</script>

<template name="mainPage">
	<layout>
		<tabs v-model:activeTitle="activeTitle">
			<tab title="aaa" name="选项卡1">
				1111
			</tab>
			<tab title="bbb" name="选项卡2">world bbb</tab>
			<tab title="ccc" name="选项卡卡卡卡卡3">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
				</scroll-view>

			</tab>
			<tab title="ddd" name="选项卡4">world bbb</tab>
		</tabs>
	</layout>
</template>

<style scoped lang="scss">
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		// height: 300rpx;
		// line-height: 300rpx;
		// text-align: center;
		// font-size: 36rpx;
	}
</style>
