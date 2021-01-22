<template>
  <div class="home">
    <div style="text-align: center;">
      <h1 class="mb-5" style="font-size: 50px;">Remember me!</h1>
    </div>
    <div>
      <form @submit.prevent="joinGame" style="display: flex; flex-direction: column; align-items: center;">
        <div class="mb-3 d-flex flex-column align-items-center">
          <label class="form-label" for="username">Username</label>
          <input
          v-model="username"
          class="form-text" type="text" style="border: none; height: 30px; border-radius: 5px; text-align: center;" id="input-name">
        </div>
        <button class="btn btn-success">Play!</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    joinGame () {
      this.$socket.emit('newPlayers', this.username)
      localStorage.username = this.username
      this.$router.push('/game')
      this.username = ''
    }
  }
}
</script>
