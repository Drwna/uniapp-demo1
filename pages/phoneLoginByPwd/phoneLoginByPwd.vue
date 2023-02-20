<script setup>
import { ref, reactive } from 'vue'
import { useCountDown } from '@/hooks/useCountDown.js'
import verify from '@/components/verify/verify.vue'
import { checkAndSendShortMsg } from '@/util/api.js'
import { loginByShortMsg, loginByPwd } from '@/util/api'
import { useUserStore } from '@/store/user.js'

const showPopup = ref(false)
const formData = reactive({
  userNo: '',
  userPwd: '',
})
const rules = reactive({
  userNo: {
    rules: [
      {
        required: true,
        errorMessage: '请输入正确格式手机号',
      },
      {
        validateFunction(rule, value, data, callback) {
          const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
          if (reg.test(value)) {
            return true
          } else {
            callback('手机格式不正确')
          }
        },
      },
    ],
  },
  userPwd: {
    rules: [
      {
        required: true,
        errorMessage: '请输入验证码',
      },
    ],
  },
})

const form = ref()

// 失败返回false，成功返回fromData
const checkForm = () => form.value.validate().catch(err => !err)

const submit = async () => {
  const checkRes = await checkForm()
	if(!checkRes) return
  const res = await loginByPwd(formData)
  if(res?.successTag){
    uni.showToast({
      title: '登录成功',
    })
  } else {
		uni.showToast({
			title: res?.message,
			icon: 'error'
		})
	}
}

</script>

<template name="login">
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :rules="rules" :modelValue="formData" validate-trigger="bind">
        <uni-forms-item label="手机号" required name="userNo">
          <uni-easyinput v-model="formData.userNo" maxlength="11" type="number" placeholder="请输入手机号" />
        </uni-forms-item>
        <uni-forms-item label="密码" required name="userPwd" class="code-wrapper">
          <uni-easyinput v-model="formData.userPwd" type="password" placeholder="请输入密码" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>

<style lang="scss">
.example {
  padding: 15px;
  background-color: #fff;
}

.code-wrapper {
  display: flex;

  ::v-deep .uni-forms-item__content {
    display: flex;

    .uni-easyinput {
      width: 60%;
      margin-right: 20rpx;
    }
  }

  .btn {
    font-size: 28rpx;
		}

	}
</style>

