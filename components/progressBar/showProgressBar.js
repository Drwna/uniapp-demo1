import progressBar from './progressBar.vue'

// 使用示例
// uni.showProgressBar({
// 	title: '版本升级',
// 	desc: '修复了一些bug',
//  percent: 0,
// })

{/* <progressBar title='hello' desc='world' percent='0' /> */}


uni.$createProgressBar = (options) => {

}
 


const showProgressBar = (options) => {
  const { title, desc, percent } = options
  const progressBarInstance = uni.$createProgressBar({
    title,
    desc,
    percent,
  })
  progressBarInstance.show()
  return progressBarInstance
}


export default showProgressBar

/*

how to use:

import showProgressBar from '@/components/progressBar/showProgressBar.js'

const progressBar = showProgressBar({
  title: '版本升级',
  desc: '修复了一些bug',
  percent: 0,
})

progressBar.update({


*/