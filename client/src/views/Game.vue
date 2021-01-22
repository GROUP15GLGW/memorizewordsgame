<template>
  <div class="game" style="width: 100vh">
    <div class="container d-flex justify-content-center flex-row mb-3">
      <button @click="startRound" class="btn btn-danger">Start</button>
    </div>
    <div class="container row" style="height: 60vh;">
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
        <div style="margin: 20px">
        <button
          class="btn btn-success btn-sm form-control mb-2"
          @click="exitGame">Exit</button>
        </div>
      </div>
      <div class="col-md-10 d-flex flex-column justify-content-between align-items-center">
        <div
        v-if="allowType === true">
        <ul>
          <li v-for="(result, idx) in resultAnswer" :key="idx">
            <h3>
            {{ result.username }} answered {{ result.answer }}, the answer is {{ answer.result }}
            </h3>
          </li>
        </ul>
        </div>
        <div class="container d-flex justify-content-center flex-wrap">
          <h4 v-for="(currentWord, idx) in currentRoundWords" :key="idx" class="m-1" style="padding: 10px 20px; background-color: rgb(252, 224, 13); border-radius: 30px;">
            {{ currentWord }}</h4>
        </div>
        <div
        v-if="allowType === true"
        class="container">
          <form
          @submit.prevent="sendAnswer"
          class="d-flex justify-content-center flex-column flex-sm-row">
            <input
            v-model="answer"
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
    exitGame () {
      localStorage.clear()
      this.$router.push('/')
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
    wordIsHidden () {
      return this.$store.state.wordIsHidden
    },
    allowType () {
      return this.$store.state.allowType
    }
  },
  sockets: {
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.username) {
      next('/')
    } else {
      next()
    }
  }
}
</script>
