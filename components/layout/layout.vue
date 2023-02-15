<script setup>
import MainHeader from '@/components/mainHeader/mainHeader.vue';
import { ref, onMounted } from 'vue';

const mainHeader = ref()
const mainHeaderHeight = ref(0)
const containerHeight = ref(0)
const system = uni.getSystemInfoSync()

onMounted( async () => {
	mainHeaderHeight.value = await mainHeader.value.getHeaderHeight()
	containerHeight.value = `${system.windowHeight - mainHeaderHeight.value}px`
})

</script>

<template name="layout">
	<view class="wrapper">
		<MainHeader ref="mainHeader" title="硕亦科技" />
		<view class="container">
			<slot />
		</view>
	</view>
</template>

<style lang="scss">
.wrapper {
	.container {
		height: v-bind(containerHeight);
		overflow: auto;
	}
}
</style>
