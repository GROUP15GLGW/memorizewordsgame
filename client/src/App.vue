<template>
  <div id="app"
    style="font-family: 'Baloo Chettan 2', cursive; height: 100vh; background: url(https://s3.amazonaws.com/gameartpartnersimagehost/wp-content/uploads/2018/03/Game_Background_190.png); background-size: cover; color: rgb(110, 66, 15); cursor: pointer;"
    class="d-flex flex-column align-items-center justify-content-center">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
