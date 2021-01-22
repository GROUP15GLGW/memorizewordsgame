<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form action="post" @submit.prevent="joinGame">
      <input type="text" v-model="username">
      <button type="submit">JOIN GAME</button>
    </form>
    <div  v-if="players.length > 0">
      <p v-for="(player, i) in players" :key="i">{{ player.username }} - {{ player.points }} points</p>
    </div>
    <div v-else>
      <p>NO DATA</p>
    </div>

    <hr>
    <button @click="startRound">START GAME</button>

    <div>
      <p v-for="(word, i) in currentRoundWords" :key="i">{{ word }}</p>
    </div><br>
    <form action="post" @submit.prevent="sendAnswer">
      <input type="text" v-model="answer" v-if="allowType === true">
      <button type="submit" v-if="allowType === true">ANSWER</button>
    </form>

    <div>
      <p v-for="(result, i) in resultAnswer" :key="i">{{ result.username }} - {{ result.answer }} - {{ result.result }} </p>
    </div><br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      answer: ''
    }
  },
  methods: {
    joinGame () {
      this.$socket.emit('newPlayers', this.username)
      localStorage.username = this.username // validate user has register
      this.username = ''
    },
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
    }
  },
  sockets: {
  }
}
</script>
