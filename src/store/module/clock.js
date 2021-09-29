const getCurrentTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours} : ${minutes} : ${seconds}`
}

const state = {
  clock: getCurrentTime()
}

const getters = {
  getClock(state) {
    return state.clock
  }
}

export default {
  state,
  getters,
}