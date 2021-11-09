import { createStore } from "vuex";

import clock from "@/store/module/clock";
import utility from "@/store/module/utility";

export default createStore({
  modules: {
    clock,
    utility,
  },
});
