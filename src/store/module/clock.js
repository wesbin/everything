const clock = {
  namespaced: true,
  state: {
    time: {
      hours: "",
      minutes: "",
    },
    date: "",
  },
  getters: {
    getTime(state) {
      return state.time;
    },
    getDate(state) {
      return state.date;
    },
  },
  mutations: {
    setTime(state) {
      const date = new Date();
      state.time.hours = date.getHours().toString().padStart(2, "0");
      state.time.minutes = date.getMinutes().toString().padStart(2, "0");
    },
    setDate(state) {
      state.date = new Date().toLocaleDateString();
    },
  },
  actions: {
    initClock({ commit, dispatch }) {
      dispatch("ticTac");
      commit("setDate");
    },
    ticTac({ commit }) {
      commit("setTime");
      setInterval(() => {
        commit("setTime");
      }, 1000);
    },
  },
};

export default clock;
