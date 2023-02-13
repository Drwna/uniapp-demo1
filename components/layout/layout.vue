<script setup>
import mainNav from '@/components/mainNav/mainNav.vue';
import MainHeader from '@/components/mainHeader/mainHeader.vue';
</script>

<template name="layout">
	<view class="wrapper">
		<MainHeader title="硕亦科技" />
		<view class="container">
			<slot />
		</view>
	</view>
</template>

<style lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	// height: calc(100vh - 44px + env(safe-area-inset-top));
	.container {
    margin-top: 44px;
    margin-top: calc(44px + constant(safe-area-inset-top));
    margin-top: calc(44px + env(safe-area-inset-top));
		flex-grow: 1;
		overflow: auto;
	}
	.footer { }
}
</style>
