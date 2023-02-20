<script setup>
import { ref, reactive } from 'vue'
import verify from '@/components/verify/verify.vue'
import { sendRegisterEmail } from '@/util/api.js'

const showPopup = ref(false)
const isVerify = ref(false);

const formData = reactive({
  userEMail: '',
  userPwd: '',
  userPwd2: '',
})
const rules = reactive({
  userEMail: {
    rules: [
      {
        required: true,
        errorMessage: '请输入正确的邮箱',
      },
      {
        validateFunction(rule, value, data, callback) {
					const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          if (reg.test(value)) {
            return true
          } else {
            callback('邮箱格式不正确')
          }
        },
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
            callback('密码必须包含大小写字母和数字，且长度不小于8位')
          }
        }
      }
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
            callback('两次输入的密码不一致')
          }
        }
      },
    ],
  },
})

const $form = ref()
// 失败返回false，成功返回fromData
const checkForm = () => $form.value.validate().catch(err => !err)

const submit = async (code) => {
  const checkRes = await checkForm()
	if(!checkRes) return
  if (!isVerify.value) {
    showPopup.value = true;
    return
  }
  const obj = {
    userEMail: formData.userEMail,
    userPwd: formData.userPwd,
    identifyCode: code,
  }
  const res = await sendRegisterEmail(obj)
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
  showPopup.value = false;
  isVerify.value = false;
}

const onConfirm = async (code) => {
  isVerify.value = true
  await submit(code)
}

</script>

<template name="register">
  <view class="container">
    <view class="custom-form">
      <uni-forms ref="$form" :rules="rules" :modelValue="formData">
        <uni-forms-item label="邮箱" required name="userEmail">
          <uni-easyinput v-model="formData.userEMail" placeholder="请输入邮箱" />
        </uni-forms-item>
        <uni-forms-item label="密码" required name="userPwd">
          <uni-easyinput v-model="formData.userPwd" type="password" placeholder="请输入密码" />
        </uni-forms-item>
        <uni-forms-item label="确认密码" required name="userPwd2">
          <uni-easyinput v-model="formData.userPwd2" type="password" placeholder="确认密码" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
    <verify ref="v" v-model="showPopup" :phoneOrEmail="formData.userEMail" @onConfirm="onConfirm" />
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
