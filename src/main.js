// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from '@/config/index.js'
import vuetify from '@/plugins/vuetify' // path to vuetify expo
// 多语言
import VueI18n from "vue-i18n";
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

Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(init);


function getLanguage() {
  // 将选择的语言存在localStorage中
  let locale = localStorage.getItem("wending.fund-locale");
  if (locale) {
    return locale;
  } else {
    return "en-US";
  }
}

const language = getLanguage();
const i18n = new VueI18n({
  locale: language,
  messages: {
    "en-US": require("@/assets/lang/en-US.json"),
    "zh-CN": require("@/assets/lang/zh-CN.json")
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  i18n,
  created: function() {
    this.init();
  },
  components: { App },
  template: '<App/>'
})
