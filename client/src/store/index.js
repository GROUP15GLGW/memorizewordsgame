import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoundWords: [],
    roundNumber: 0,
    players: []
  },
  mutations: {
    SOCKET_initPlayers (state, payload) {
      state.players = payload
    },
    SOCKET_serverPlayers (state, payload) {
      state.players.push(payload)
    },
    SOCKET_setCurrentRoundWords (state, payload) {
      state.currentRoundWords = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
