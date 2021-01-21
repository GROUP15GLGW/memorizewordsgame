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
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    joinGame () {
      this.$socket.emit('newPlayers', this.username)
      localStorage.username = this.username // validate user has register
      this.username = ''
    }
  },
  computed: {
    players () {
      return this.$store.state.players
    }
  },
  sockets: {
  }
}
</script>
