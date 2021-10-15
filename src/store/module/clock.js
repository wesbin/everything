const getCurrentTime = () => {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours} : ${minutes} : ${seconds}`
}

const state = {
  clock: getCurrentTime()
}

const getters = {
  getClock() {
    return state.clock
  }
}

const mutations = {
  setClock(state, { time }) {
    state.clock = time
  }
}

const actions = {
  ticTacClock({ commit }, ) {
    setInterval(() => {
      commit('setClock', {
        time: getCurrentTime()
      })
    }, 1000)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}