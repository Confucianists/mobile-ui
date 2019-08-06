import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { get, post } from './api/axios'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 公共样式的统一引入
import '@/common/stylus/index.styl'

// animate.css
import animated from 'animate.css'
Vue.use(animated)

// cube的UI库
import Cube from 'cube-ui'
Vue.use(Cube)



import hwUI from '@/base/hwUI'
Vue.use(hwUI)

Vue.prototype.get = get
Vue.prototype.post = post


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
})


