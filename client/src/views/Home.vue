<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{ currentRoundWords }}</p>
    <button type="button" @click="startRound">Start</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    currentRoundWords () {
      return this.$store.state.currentRoundWords
    }
  },
  methods: {
    startRound () {
      this.$socket.emit('startRound')
    }
  }
}
</script>
