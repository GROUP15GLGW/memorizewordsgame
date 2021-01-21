import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoundWords: [],
    roundNumber: 0,
    players: [],
    wordIsHidden: false,
    allowType: false
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
    },
    SOCKET_showWord (state, payload) {
      state.wordIsHidden = false
    },
    hideWord (state, payload) {
      state.wordIsHidden = payload
    },
    allowType (state, payload) {
      state.allowType = payload
    }
  },
  actions: {
    hideWord (context, payload) {
      context.commit('hideWord', true)
      context.commit('allowType', true)
      setTimeout(() => {
        context.dispatch('endRound')
      }, 5000)
    },
    endRound (context, payload) {
      context.commit('allowType', false)
      setTimeout(() => {
        context.dispatch('startRound')
      }, 5000)
    },
    startRound (context, payload) {
      (new Vue()).$socket.client.emit('startRound') //unsolved
      setTimeout(() => {
        context.dispatch('hideWord')
      }, 5000)
    }
  },
  modules: {
  }
})
