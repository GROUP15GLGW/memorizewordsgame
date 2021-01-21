<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{ currentRoundWords }}</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    currentRoundWords () {
      return this.$store.state.currentRoundWords
    }
  }
}
</script>
