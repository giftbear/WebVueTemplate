import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale }) //组件国际化

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
