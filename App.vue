<script>
	import { upgrade } from './util/upgrade.js'
	export default {
		onLaunch() {
			// console.log('App Launch')
			upgrade()
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}

</script>

<style>
	/*每个页面公共css */
	ul { list-style: none; margin: 0; padding:0;}
</style>
