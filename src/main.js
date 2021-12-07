// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from '@/config/index.js'
import vuetify from '@/plugins/vuetify' // path to vuetify expo
// 缓存
import Vuex from "vuex";
// 缓存
import { store } from "./store/store";
// 初始化数据
import init from '@/store/init.js';
// 图标
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// CSS
import '../static/css/common.css'
import '../static/css/color.css'

Vue.config.productionTip = false

Vue.prototype.$config = config

Vue.use(Vuex);
Vue.use(init);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  created: function() {
    this.init();
  },
  components: { App },
  template: '<App/>'
})
