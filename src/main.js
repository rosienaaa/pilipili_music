import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'

import element from 'element-plus';
import 'element-plus/dist/index.css'
import vuex from 'vuex'
import store from './store/store'

import router from '../router/index.js'

// Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = 'https://autumnfish.cn/'

const app = createApp(App)
app.use(router)
app.use(vuex)
app.use(store)
app.mount('#app')
app.use(element)
app.config.globalProperties.$axios = axios;
