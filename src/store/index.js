import { createStore } from 'vuex';

import clock from '@/store/module/clock';
import widget from '@/store/module/widget';
import float from '@/store/module/float';

export default createStore({
  modules: {
    clock,
    widget,
    float,
  },
});
