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
    SOCKET_setRoundNumber (state, payload) {
      state.roundNumber = payload
    },
    SOCKET_showWord (state, payload) {
      state.wordIsHidden = false
    },
    SOCKET_matchEnd (state, payload) {
      state.matchEnded = true
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
