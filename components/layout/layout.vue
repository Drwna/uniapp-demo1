<script setup>
import mainNav from '@/components/mainNav/mainNav.vue';
import MainHeader from '@/components/mainHeader/mainHeader.vue';
import { ref, onMounted, watch, computed } from 'vue';

const header = ref()
const height = ref('0px')
onMounted( async () => {
	height.value = await header.value.getHeaderHeight()
})

</script>

<template name="layout">
	<view class="wrapper">
		<MainHeader ref="header" title="硕亦科技" />
		<view class="container">
			<slot />
		</view>
	</view>
</template>

<style lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	.container {
		margin-top: v-bind(height);
		flex-grow: 1;
		overflow: auto;
	}
	.footer { }
}
</style>
