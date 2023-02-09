import { reactive } from 'vue'

export const useCountDown = (time = 90) => {
  const btnState = reactive({
    text: '获取验证码',
    disabled: false,
  })
  const startCount = () => {
    btnState.disabled = true
    let count = time
    btnState.text = `${count}s重新获取`
    const timer = setInterval(() => {
      btnState.text = `${count}s重新获取`
      count--
      if (count < 0) {
        clearInterval(timer)
        btnState.text = '获取验证码'
        btnState.disabled = false
      }
    }, 1000)
  }

  return { btnState, startCount }
}