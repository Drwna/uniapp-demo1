<script>
import { useAppInfoStore } from './store/appInfo'


	export default {
		async onLaunch() {
			console.log('App Launch')

			// #ifdef APP-PLUS  
			const remoteInfo = await uni.$get('http://www.safereborn.com:8084/appInfo.json')
			const {version: remoteVersion, apkName} = remoteInfo
			const appInfo = useAppInfoStore()
			appInfo.newestVersion = remoteVersion
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				appInfo.currentVersion = wgtinfo.version
				console.log('当前版本：' + wgtinfo.version)
				console.log('远程版本：' + remoteVersion)
				console.log('包名：' + apkName)
				const remoteApkUrl = `http://www.safereborn.com:8084/${apkName}.apk`
				if( remoteVersion > wgtinfo.version ){
					uni.showModal({
						title: '版本更新',
						content: '有新版本，是否更新？',
						confirmText: '下载更新',
						cancelText: '取消',
						success(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								const showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
								const downloadTask = uni.downloadFile({
									url: remoteApkUrl,
									success: (downloadResult) => {
										console.log('下载成功, success', downloadResult)
										if (downloadResult.statusCode === 200) {
											plus.runtime.install(downloadResult.tempFilePath, {
													force: false
												},
												function() {
													console.log('install success...');
													plus.runtime.restart();
												},
												function(e) {
													console.error('install fail...');
												}
											);
										}
									},
									fail: (err) => {
										console.log('downloadFile fail', err);
									},
									complete(){
										console.log('完成！')
									}
								});
								downloadTask.onProgressUpdate((res) => {
									console.log('下载进度' + res.progress);
									if(res.progress >= 100) {
										showLoading.closeWaiting()
									} else {
										showLoading.setTitle(`正在下载 ${res.progress}%`)
									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}

</script>

<style>
	/*每个页面公共css */
</style>
