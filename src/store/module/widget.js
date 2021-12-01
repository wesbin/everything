import { v4 as uuidv4 } from 'uuid';

const widget = {
  namespaced: true,
  state: {
    // 보여지고 있는 위젯 리스트
    /*

      ### 위젯 공통
      fixme id: String(uuidv4())
      type: String('memo/MemoList')
      visible: Boolean
      style: Object(
        {
          left,
          top,
          width,
          height,
          'z-index',
        }
      )

      ### Memo
      contents: String

    */
    widgetList: [
      {
        type: 'FloatMenu',
        visible: true,
        style: {},
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
  },
  actions: {
    // 플로팅 메뉴에서 위젯 클릭하면 해당하는 위젯 화면에 추가
    addWidget({ commit, getters }, { type, isSingle, widget }) {
      // 위치 설정
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
          left: `calc(${widget.style.left} + ${widget.style.width}px + 5px)`,
          top: widget.style.top,
          'z-index': getters.getTopIndex,
        },
      });
    },
  },
};

export default widget;
