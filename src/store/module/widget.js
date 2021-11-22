const widget = {
  namespaced: true,
  state: {
    // 보여지고 있는 위젯 리스트
    widgetList: [],
    // 현재 위젯 중 z-index 최대 값
    topIndex: 1,
  },
  getters: {
    getWidgetList(state) {
      return state.widgetList;
    },
    getTopIndex(state) {
      return state.topIndex;
    },
  },
  mutations: {
    // 위젯 추가
    setWidget(state, widget) {
      state.widgetList.push(widget);
    },
    // 위젯 z-index 1 증가
    upIndex(state) {
      state.topIndex += 1;
    },
  },
  actions: {
    // 플로팅 메뉴에서 위젯 클릭하면 해당하는 위젯 화면에 추가
    addWidget({ commit, getters, rootGetters }, type) {
      // 위치 설정
      const positions = rootGetters['float/getPositions'];
      commit('upIndex');
      commit('setWidget', {
        type: type,
        style: {
          left: `calc(${positions.left} + ${positions.width}px + 5px)`,
          top: positions.top,
          'z-index': getters.getTopIndex,
        },
      });
    },
  },
};

export default widget;
