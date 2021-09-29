import Vue from 'vue'
import Vuex from 'vuex'

import clock from './module/clock'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    clock
  }
})