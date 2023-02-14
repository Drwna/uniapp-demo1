import { useAppInfoStore } from '@/store/appInfo'

export const upgrade = async () => {
  // #ifdef APP-PLUS  
  const remoteInfo = await uni.$get(`http://www.safereborn.com:8084/appInfo.json`)
  const {version: remoteVersion, apkName, title, desc} = remoteInfo
  // console.log(remoteInfo, remoteInfo.title, remoteInfo.desc)
  const appInfo = useAppInfoStore() // 获取appInfo
  appInfo.upgradeState.version = remoteVersion
  appInfo.upgradeState.desc = desc
  appInfo.newestVersion = remoteVersion // 更新appInfo中的最新版本号
  plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
    appInfo.currentVersion = wgtinfo.version // 更新appInfo中的当前版本号
    const remoteApkUrl = `http://www.safereborn.com:8084/${apkName}.apk`
    if( remoteVersion > wgtinfo.version ) {
      uni.showModal({
        title: '版本更新',
        content: '有新版本，是否更新？',
        confirmText: '下载更新',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            appInfo.upgradeState.isLoading = true
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
                appInfo.upgradeState.isLoading = false
              } else {
                appInfo.upgradeState.percent = res.progress
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
}
