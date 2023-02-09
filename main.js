import App from './App'
import '@/util/request.js'
import { setupGlobDirectives } from '@/directives/index.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
	app.use(Pinia.createPinia())
  setupGlobDirectives(app)
  return {
    app,
    Pinia
  }
}
// #endif