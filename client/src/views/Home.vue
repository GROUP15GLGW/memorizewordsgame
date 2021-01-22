<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p
    v-if="wordIsHidden === false"
    >{{ currentRoundWords }}</p>
    <button type="button" @click="startRound">Start</button>
    <form action="">
      <input type="text" v-if="allowType === true">
    </form>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    currentRoundWords () {
      return this.$store.state.currentRoundWords
    },
    wordIsHidden () {
      return this.$store.state.wordIsHidden
    },
    allowType () {
      return this.$store.state.allowType
    }
  },
  methods: {
    startRound () {
      this.$socket.emit('startRound')
      setTimeout(() => {
        this.$socket.emit('hideWords')
      }, 5000)
    },
    sendAnswers () {
      this.$store.commit('checkAnswer', {
        username: localStorage.username,
        words: this.words.split(' ')
      })
      this.words = ''
    }
  },
  data () {
    return {
      words: ''
    }
  }
}
</script>
