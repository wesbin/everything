const widget = {
  namespaced: true,
  state: {
    widgetList: [],
  },
  getters: {
    getWidgetList(state) {
      return state.widgetList;
    },
  },
  mutations: {
    setWidget(state, widget) {
      state.widgetList.push(widget);
    },
  },
  actions: {
    addWidget({ commit, rootGetters }, type) {
      const positions = rootGetters['float/getPositions'];
      const left = parseInt(positions.left.slice(0, -2));
      const top = parseInt(positions.top.slice(0, -2));
      commit('setWidget', {
        type: type,
        style: {
          left: `${left + positions.width + 5}px`,
          top: `${top}px`,
        },
      });
    },
  },
};

export default widget;
