import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'

import element from 'element-plus';
import 'element-plus/dist/index.css'
import store from './store/store'
import moment from 'moment'
import router from './router/index.js'

import axios from 'axios'
axios.defaults.baseURL = 'https://autumnfish.cn/'

const app = createApp(App)
app.config.productionTip = false
app.use(router)
app.use(store)
app.mount('#app')
app.use(element)
app.use(moment)
app.config.globalProperties.$axios = axios;
