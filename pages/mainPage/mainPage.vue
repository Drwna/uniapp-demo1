<script setup>
import layout from '@/components/layout/layout.vue';
import tabs from '@/components/tabs/tabs.vue';
import tab from '@/components/tabs/tab.vue';
import { ref } from 'vue';

const scroll = () => {
	
}

const activeTab = ref('a')


</script>

<template name="mainPage">
	<layout>

		<tabs v-model:active="activeTab">
			<tab name="a">hello</tab>
			<tab name="c">uniApp</tab>
			<tab name="b">world</tab>
		</tabs>

	</layout>
</template>

<style lang="scss">
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
</style>
