import Vue from 'vue'
import Vuex from 'vuex'
import vm from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentRoundWords: [],
    roundNumber: 0,
    players: [],
    wordIsHidden: false,
    allowType: false,
    resultAnswer: []
  },
  mutations: {
    // PLAYER DATA
    SOCKET_initPlayers (state, payload) {
      state.players = payload
    },
    SOCKET_serverPlayers (state, payload) {
      state.players.push(payload)
    },
    SOCKET_updatePlayerPoint (state, payload) {
      state.players = payload
    },
    // SET WORDS
    SOCKET_resultAnswer (state, payload) {
      state.resultAnswer.push(payload)
    },
    SOCKET_setCurrentRoundWords (state, payload) {
      state.currentRoundWords = payload
    },
    SOCKET_setRoundNumber (state, payload) {
      state.roundNumber = payload
    },
    SOCKET_showWord (state, payload) {
      state.wordIsHidden = false
    },
    SOCKET_matchEnd (state, payload) {
      state.matchEnded = true
    },
    SOCKET_allowType (state, payload) {
      state.allowType = payload
    },
    hideWord (state, payload) {
      state.wordIsHidden = payload
    },
    resultAnswerReset (state, payload) {
      state.resultAnswer = []
    }
  },
  actions: {
    SOCKET_hideWords (context, payload) {
      context.commit('hideWord', true)
      context.commit('SOCKET_allowType', true)
      context.state.currentRoundWords = []
      setTimeout(() => {
        vm.$socket.emit('endRound', localStorage.username)
      }, 5000)
    }
  },
  modules: {
  }
})
