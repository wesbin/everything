import { createStore } from 'vuex';

import clock from '@/store/module/clock';
import widget from '@/store/module/widget';

export default createStore({
  state: {
    drag: false,
  },
  getters: {
    getDrag(state) {
      return state.drag;
    },
  },
  mutations: {
    setDrag(state, bool) {
      state.drag = bool;
    },
  },
  modules: {
    clock,
    widget,
  },
});
