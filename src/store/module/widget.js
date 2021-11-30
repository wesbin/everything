import { v4 as uuidv4 } from 'uuid';

const widget = {
  namespaced: true,
  state: {
    // 보여지고 있는 위젯 리스트
    /*

      ### 공통
      id: String(uuidv4())
      type: String('memo/MemoList')
      visible: Boolean
      style: Object(
        {
          left,
          top,
          'z-index',
          ...
        }
      )

      ### Memo
      contents: String

    */
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
    findTypeWidgetList: (state) => (type) => {
      return state.widgetList.find((widget) => widget.type === type);
    },
    filterTypeWidgetList: (state) => (type) => {
      return state.widgetList.filter((widget) => widget.type === type);
    },
  },
  mutations: {
    // 위젯 추가
    setWidget(state, widget) {
      state.widgetList.push(widget);
    },
    // 위젯 보이기
    showWidget(state, widget) {
      widget.visible = true;
    },
    // 위젯 숨기기
    hideWidget(state, widget) {
      widget.visible = false;
    },
    // 위젯 z-index 1 증가
    upIndex(state) {
      state.topIndex += 1;
    },
    // 위젯 내용 업데이트
    updateWidget(state, { widget, ...args }) {
      Object.entries(args).forEach(([key, value]) => {
        widget[key] = value;
      });
    },
  },
  actions: {
    // 플로팅 메뉴에서 위젯 클릭하면 해당하는 위젯 화면에 추가
    addWidget({ commit, getters, rootGetters }, { type, isSingle }) {
      // 위치 설정
      const positions = rootGetters['float/getPositions'];
      commit('upIndex');
      // 단일 위젯 확인
      if (isSingle) {
        // 이미 생성된 단일 위젯이었다면
        const widget = getters.findTypeWidgetList(type);
        if (widget) {
          commit('showWidget', widget);
          return false;
        }
      }
      commit('setWidget', {
        id: uuidv4(),
        type: type,
        visible: true,
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
