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
    SOCKET_hideWords (state, payload) { // clear words from all client
      state.currentRoundWords = []
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
    allowType (state, payload) {
      state.allowType = payload
    }
  },
  actions: {
    endRound (context, payload) {
      context.commit('allowType', false)
      console.log(context.state.roundNumber, 'round number ------------')
      if (context.state.roundNumber <= 2) {
        setTimeout(() => {
          context.dispatch('startRound')
        }, 5000)
      } else {
        vm.$socket.emit('resetRoundNumber')
      }
    },
    startRound (context, payload) {
      vm.$socket.emit('startRound')
      setTimeout(() => {
        context.dispatch('hideWord')
      }, 5000)
    }
  },
  modules: {
  }
})
