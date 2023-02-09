<script setup>
import { ref, reactive } from 'vue'
import { useCountDown } from '@/hooks/useCountDown.js'
import verify from '@/components/verify/verify.vue'
import { checkAndSendShortMsg } from '@/util/api.js'
import { registerByPhone } from '@/util/api'

const showPopup = ref(false)
const formData = reactive({
	mobilePhoneNo: '17864270724',
	identifyCode: '',
	userPwd: '',
  userPwd2: '',
})
const rules = reactive({
  mobilePhoneNo: {
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
  identifyCode: {
    rules: [
      {
        required: true,
        errorMessage: '请输入验证码',
      },
    ],
  },
  userPwd: {
    rules: [
      {
        required: true,
        errorMessage: '请输入密码',
      },
      {
        validateFunction(rule, value, data, callback) {
          const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
          if (reg.test(value)) {
            return true
          } else {
            callback(' 必须包含大小写字母和数字，且长度不小于8位')
          }
        },
      },
    ],
  },
  userPwd2: {
    rules: [
      {
        required: true,
        errorMessage: '请再次输入密码',
      },
      {
        validateFunction(rule, value, data, callback) {
          if (value === formData.userPwd) {
            return true
          } else {
            callback('两次密码不一致')
          }
        },
      },
    ],
  }
})

const { btnState, startCount } = useCountDown(3)
const form = ref()
const mobilePhoneNo = ref()

// 失败返回false，成功返回fromData
const checkForm = () => form.value.validate().catch(err => !err)
// 失败返回null，成功返回错误信息
const checkPhone = () => mobilePhoneNo.value.onFieldChange(formData.mobilePhoneNo)

const submit = async () => {
  const checkRes = await checkForm()
	if(!checkRes) return
  const res = await registerByPhone(formData)
  console.log(res)
  if(res?.successTag){
    uni.showToast({
      title: '注册成功',
    })
  } else {
    uni.showToast({
      title: res.message,
      icon: 'error',
    })
  }
}

const getCode = async () => {
	const res = await checkPhone()
	if(res) return
	showPopup.value = true
}

const onConfirm = async (val) => {
  formData.identifyCode = val
  const res = await checkAndSendShortMsg(formData)
  if(res?.successTag) {
    showPopup.value = false
    uni.showToast({
      title: '验证码发送成功',
      duration: 2000
    });
    startCount()
  } else {
    uni.showToast({
      title: '验证码不正确！',
      icon: 'error',
      duration: 2000
    });
  }
}

</script>

<template name="register">
  <view class="container">
    <view class="custom-form">
      <uni-forms ref="form" :rules="rules" :modelValue="formData" validate-trigger="bind">
        <uni-forms-item ref="mobilePhoneNo" label="手机号" required name="mobilePhoneNo">
          <uni-easyinput v-model="formData.mobilePhoneNo" maxlength="11" type="number" placeholder="请输入手机号" />
        </uni-forms-item>
        <uni-forms-item label="验证码" required name="identifyCode" class="code-wrapper">
          <uni-easyinput v-model="formData.identifyCode" maxlength="6" type="number" placeholder="请输入验证码" />
          <button :disabled="btnState.disabled" @click="getCode" type="primary" class="btn">{{ btnState.text }}</button>
        </uni-forms-item>
        <uni-forms-item label="密码" required name="userPwd">
          <uni-easyinput v-model="formData.userPwd" type="password" placeholder="密码" />
        </uni-forms-item>
        <uni-forms-item label="确认密码" required name="userPwd2">
          <uni-easyinput v-model="formData.userPwd2" type="password" placeholder="确认密码" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
    <verify ref="v" v-model="showPopup" :phone="formData.mobilePhoneNo" @onConfirm="onConfirm" />
  </view>
</template>

<style lang="scss" scoped>
.custom-form {
  padding: 15px;
  background-color: #fff;

  ::v-deep .uni-forms-item__label {
    width: 76px !important;
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
}
</style>
