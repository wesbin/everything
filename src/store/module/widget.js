import { v4 as uuidv4 } from 'uuid';

const widget = {
  namespaced: true,
  state: {
    // 보여지고 있는 위젯 리스트
    widgetList: [
      {
        type: 'navigation/Navigation',
        visible: true,
        style: {
          'z-index': 2147483647,
        },
      },
    ],
    // 현재 위젯 중 z-index 최대 값
    topIndex: 1,
    // drag 여부
    drag: false,
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
    findIdWidgetList: (state) => (id) => {
      return state.widgetList.find((widget) => widget.id === id);
    },
    getDrag(state) {
      return state.drag;
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
      function merge(target, source) {
        Object.entries(source).forEach(([key, value]) => {
          if (value instanceof Object) {
            merge(target[key], value);
          } else {
            target[key] = value;
          }
        });
      }
      merge(widget, args);
    },
    setDrag(state, bool) {
      state.drag = bool;
    },
    // 위젯 삭제
    deleteWidget(state, id) {
      const targetWidget = state.widgetList.find((widget) => widget.id === id);
      targetWidget.visible = false;
      targetWidget.delete = true;
    },
  },
  actions: {
    // 플로팅 메뉴에서 위젯 클릭하면 해당하는 위젯 화면에 추가
    addWidget({ commit, getters }, { widget, ...args }) {
      // 위치 설정
      commit('upIndex');
      // 단일 위젯 확인
      if (args.isSingle) {
        // 이미 생성된 단일 위젯이었다면
        const targetSingleWidget = getters.findTypeWidgetList(args.type);
        if (targetSingleWidget) {
          commit('showWidget', targetSingleWidget);
          return false;
        }
      }
      // fixme 덮어쓰기가 효율적인 방법인거 같진 않아
      commit('setWidget', {
        id: uuidv4(),
        visible: true,
        delete: false,
        style: {
          left: `calc(${widget.style.left} + ${widget.style.width}px + 5px)`,
          top: widget.style.top,
          'z-index': getters.getTopIndex,
        },
        ...args,
      });
    },
  },
};

export default widget;
