const state = {
  time: '',
  date: ''
}

const getters = {
  getTime() {
    return state.time
  },
  getDate() {
    return state.date
  }
}

const mutations = {
  setTime(state) {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    state.time = `${hours} : ${minutes} : ${seconds}`
  },
  setDate(state) {
    state.date = new Date().toLocaleDateString()
  }
}

const actions = {
  ticTacClock({ commit }, ) {
    setInterval(() => {
      commit('setTime')
    }, 1000)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}