import { createStore } from "vuex";

import clock from "./module/clock";

export default createStore({
  modules: {
    clock
  }
});
