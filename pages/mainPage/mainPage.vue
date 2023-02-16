<script setup>
import layout from '@/components/layout/layout.vue';
import tabs from '@/components/tabs/tabs.vue';
import tab from '@/components/tabs/tab.vue';
import { ref } from 'vue';

const activeTitle = ref('')

</script>

<template name="mainPage">
	<layout>
		<view>
			<tabs v-model:activeTitle="activeTitle">
				<tab title="aaa" name="选项卡1"> hello </tab>
				<tab title="bbb" name="选项卡2">world bbb</tab>
				<tab title="ccc" name="选项卡3">world bbb</tab>
				<tab title="ddd" name="选项卡4">world bbb</tab>
			</tabs>
		</view>
	</layout>
</template>

<style lang="scss">
</style>
