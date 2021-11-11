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
    addMemo(state) {
      state.widgetList.push('@/components/widget/Memo');
    },
  },
  actions: {},
};

export default widget;
