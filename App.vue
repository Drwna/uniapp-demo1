<script setup>
	import { upgrade } from './util/upgrade.js'
	import { onShow, onReady, onLaunch } from '@dcloudio/uni-app';

	// 只能在App.vue里监听应用的生命周期
	onLaunch(() => {
		console.log('App Launch')
		upgrade()
	})
	onShow(() => {
		console.log('App Show')
	})
	onReady(() => {
		console.log('App Ready')
	})
</script>

<style>
	/*每个页面公共css */
	ul { list-style: none; margin: 0; padding:0;}
</style>
