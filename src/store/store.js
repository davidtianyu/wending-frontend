import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: { },
  mutations: { },
  actions: { },
  modules: {
  	data,
  	user
  }
})
