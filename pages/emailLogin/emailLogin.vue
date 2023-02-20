<script setup>
import { ref, reactive } from 'vue'
import { loginByPwd } from '@/util/api'

const formData = reactive({
  userNo: '',
  userPwd: '',
  userPwd2: '',
})
const rules = reactive({
  userNo: {
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
						callback('两次密码不一致')
					}
				},
			},
		],
	},
})

const $form = ref()
const checkForm = () => $form.value.validate().catch(err => !err)
const submit = async () => {
  const checkRes = await checkForm()
	if(!checkRes) return
  const res = await loginByPwd(formData)
  console.log(res)
  if(res?.successTag){
    uni.showToast({
      title: '登录成功',
      duration: 2000
    })
  } else {
		uni.showToast({
			title: res?.message,
			icon: 'error',
		})
	}
}

</script>

<template name="login">
  <view class="container">
    <view class="example">
			<!-- validate-trigger="bind" 输入时校验 -->
      <uni-forms ref="$form" :rules="rules" :modelValue="formData">
        <uni-forms-item label="邮箱" required name="userNo">
          <uni-easyinput v-model="formData.userNo" placeholder="请输入邮箱" />
        </uni-forms-item>
        <uni-forms-item label="密码" required name="userPwd">
          <uni-easyinput v-model="formData.userPwd" type="password" placeholder="请输入密码" />
        </uni-forms-item>
        <uni-forms-item label="确认密码" required name="userPwd2">
          <uni-easyinput v-model="formData.userPwd2" type="password" placeholder="请再次输入密码" />
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

:deep(.uni-forms-item__label) {
		width: 150rpx !important;
}

.code-wrapper {
  display: flex;

  :deep(.uni-forms-item__content) {
    display: flex;
    .uni-easyinput {
      // width: 60%;
      // margin-right: 20rpx;
    }
  }
  .btn {
    font-size: 28rpx;
		}
	}
</style>
