const float = {
  namespaced: true,
  state: {
    drag: false,
    positions: {
      left: '',
      top: '',
      width: '',
      height: '',
    },
  },
  getters: {
    getDrag(state) {
      return state.drag;
    },
    getPositions(state) {
      return state.positions;
    },
  },
  mutations: {
    setDrag(state, bool) {
      state.drag = bool;
    },
    setPositions(state, positions) {
      state.positions = positions;
    },
  },
};

export default float;
