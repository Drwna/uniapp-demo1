import { defineStore } from 'pinia'
import { getCurrUserInfo } from '@/util/api'
import defaultAvatar from '@/static/logo.png'

const baseAvatarUrl = 'https://cosmos-app.oss-cn-shanghai.aliyuncs.com/avatar/'

export const useUserStore = defineStore('userInfo', {
  state: () => ({
    isLogin: false,
    nickName: '',
    avatarUrl: defaultAvatar,
    userEMail: '',
  }),
  actions: {
    async getUserInfo() {
      const response = await getCurrUserInfo()
      if (response?.errMsg) {
        this.$reset()
        return false
      }
      if (!response.successTag) {
        return false
      }
      this.isLogin = true
      this.nickName = response.rtnObj1.nickName
      this.avatarUrl = baseAvatarUrl + response.rtnObj1.avatarUrl
      this.userEMail = response.rtnObj1.userEMail
      return true
    },
  },
})
