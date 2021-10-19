import Vue from 'vue'
import Vuex from 'vuex'

import clock from './module/clock'
import todo from './module/todo'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    clock,
    todo,
  }
})