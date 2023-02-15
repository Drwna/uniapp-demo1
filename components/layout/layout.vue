<script setup>
import MainHeader from '@/components/mainHeader/mainHeader.vue';
import { ref, onMounted } from 'vue';

const header = ref()
const height = ref('0px')
onMounted( async () => {
	height.value = await header.value.getHeaderHeight()
})

</script>

<template name="layout">
	<view class="wrapper">
		<MainHeader ref="header" title="xxx科技" />
		<view class="container">
			<slot />
		</view>
	</view>
</template>

<style lang="scss">
.wrapper {
	.container {
		margin-top: v-bind(height);
	}
}
</style>
