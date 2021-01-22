<template>
  <div class="game">
    <div class="container d-flex justify-content-center flex-row mb-3">
      <button @click="startRound" class="btn btn-danger" v-if="matchEnded === true">Start</button>
    </div>
    <div class="container row" style="height: 70vh;">
      <div class="col-md-2">
        <h4>Player List</h4>
        <ul class="list-group">
          <li
          v-for="(player, index) in players"
          :key="index"
          class="mb-2 d-flex justify-content-between align-items-center">
            {{ player.username }}
            <span class="badge bg-warning rounded-pill">{{ player.points }}</span>
          </li>
        </ul>
      </div>
      <div class="col-md-10 d-flex flex-column justify-content-between align-items-center">
        <div class="container d-flex justify-content-center flex-wrap">
          <h4 v-for="(currentWord, idx) in currentRoundWords" :key="idx" class="m-1" style="padding: 10px 20px; background-color: rgb(252, 224, 13); border-radius: 30px;">
            {{ currentWord }}</h4>
        </div>
        <div class="container" v-if="allowType === true">
          <form
          @submit.prevent="sendAnswer"
          class="d-flex justify-content-center flex-column flex-sm-row">
            <input
            v-model="answer"
            autocomplete="off"
            class="form-text mx-2 flex-grow-1" type="text"
              style="border: none; height: 30px; border-radius: 5px; text-align: center;" id="input-name">
            <button role="submit" class="btn btn-warning mx-2">Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      username: '',
      answer: ''
    }
  },
  methods: {
    startRound () {
      this.$socket.emit('startRound')
      setTimeout(() => {
        console.log('counting')
        this.$socket.emit('hideWords')
      }, 10000)
    },
    sendAnswer () {
      this.$socket.emit('answers', {
        username: localStorage.username,
        answer: this.answer
      })
      this.answer = ''
    },
    resetPlayerData () {
      this.$socket.emit('clearPlayerData', localStorage.username)
    }
  },
  computed: {
    players () {
      return this.$store.state.players
    },
    currentRoundWords () {
      return this.$store.state.currentRoundWords
    },
    resultAnswer () {
      return this.$store.state.resultAnswer
    },
    allowType () {
      return this.$store.state.allowType
    },
    matchEnded () {
      return this.$store.state.matchEnded
    }
  },
  sockets: {
  },
  mounted () {
    window.onbeforeunload = function (e) {
      this.resetPlayerData()
      localStorage.clear()
    }
  }
}
</script>
