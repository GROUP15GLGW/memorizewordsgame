import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoundWords: [],
    roundNumber: 0
  },
  mutations: {
    SOCKET_setCurrentRoundWords (state, payload) {
      state.currentRoundWords = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
