import Vue from 'vue'
import ElementUI from 'element-ui'
// import '../theme/index.css'

import App from './App.vue'
import VueRouter from 'vue-router'
import routerMap from './router.js'
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://43.143.189.51:9999';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
Vue.use(VueRouter);
Vue.use(ElementUI);
import formatDate from './components/DataChange/FormData.js'
Vue.prototype.$formatDate = formatDate
import 'element-ui/lib/theme-chalk/index.css';
const router = new VueRouter({routes: routerMap})

const app = new Vue({
  router
}).$mount('#app');
