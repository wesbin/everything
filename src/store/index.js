import { createStore } from "vuex";

import clock from "@/store/module/clock";
import widget from "@/store/module/widget";

export default createStore({
  modules: {
    clock,
    widget,
  },
});
