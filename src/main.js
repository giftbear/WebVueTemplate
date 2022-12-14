import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import '@/router/before.js' //路由前置守卫
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import * as echarts from 'echarts'
import uploader from 'vue-simple-uploader' //分片上传组件

Vue.config.productionTip = false
Vue.use(ElementUI, { locale }) //组件国际化
Vue.prototype.$echarts = echarts
Vue.use(uploader)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')