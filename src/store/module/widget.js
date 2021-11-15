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
    // 플로팅 메뉴에서 위젯 클릭하면 해당하는 위젯 화면에 추가
    addWidget({ commit, rootGetters }, type) {
      // 위치 설정
      const positions = rootGetters['float/getPositions'];
      commit('setWidget', {
        type: type,
        style: {
          left: `calc(${positions.left} + ${positions.width}px + 5px)`,
          top: positions.top,
        },
      });
    },
  },
};

export default widget;
